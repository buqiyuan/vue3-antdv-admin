import { setupWorker } from 'msw/browser';
import { log } from '../utils/log';
import type { RequestHandler } from 'msw';

const genMessage = (handlers: RequestHandler[]) => {
  return {
    type: 'updateMockHeaders',
    mockHeaders: handlers.map((n) => n.info.header),
  };
};

const postMsg = (registration: ServiceWorkerRegistration, handlers: RequestHandler[]) => {
  const serviceWorker = registration.active;
  if (serviceWorker) {
    serviceWorker.postMessage(genMessage(handlers));

    registration.addEventListener('updatefound', () => {
      serviceWorker.postMessage(genMessage(handlers));
      // If updatefound is fired, it means that there's a new service worker being installed.
      log(`Value of updateViaCache: ${registration.updateViaCache}`);
    });
  }
};

export const enableMocking = async (handlers: RequestHandler[]) => {
  const worker = setupWorker(...handlers);

  globalThis.__msw_worker = worker;

  const serviceWorkerRegistration = await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL || ''}/mockServiceWorker.mjs`.replace(/\/{2,}/g, '/'),
      options: {
        updateViaCache: 'none',
      },
    },
  });

  if (serviceWorkerRegistration) {
    postMsg(serviceWorkerRegistration, handlers);
  } else if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((registration) => {
      // log('serviceWorker ready', registration, this.genMessage());
      postMsg(registration, handlers);
    });
  }

  return serviceWorkerRegistration;
};
