import { setupWorker } from 'msw/browser';
import { log } from '../utils/log';
import type { RequestHandler } from 'msw';

export const enableMocking = async (handlers: RequestHandler[]) => {
  const worker = setupWorker(...handlers);

  if (import.meta.env.DEV) {
    globalThis.__msw_worker = worker;
  }

  const serviceWorkerRegistration = await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL || ''}/mockServiceWorker.mjs`.replace(/\/{2,}/g, '/'),
      options: {
        updateViaCache: 'none',
      },
    },
  });

  const genMessage = () => {
    return {
      type: 'updateMockHeaders',
      mockHeaders: handlers.map((n) => n.info.header),
    };
  };

  const postMsg = (registration: ServiceWorkerRegistration) => {
    registration.active?.postMessage(genMessage());
    registration.addEventListener('updatefound', () => {
      registration.active?.postMessage(genMessage());
      log('Service Worker update found!');
    });
  };

  if (serviceWorkerRegistration) {
    postMsg(serviceWorkerRegistration);
  } else if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((registration) => {
      // log('serviceWorker ready', registration, this.genMessage());
      postMsg(registration);
    });
  }

  return serviceWorkerRegistration;
};
