import { type StartOptions, setupWorker } from 'msw/browser';
import { log } from '../utils/log';
import type { HttpHandler } from 'msw';

const genMessage = (handlers: HttpHandler[]) => {
  return {
    type: 'updateMockHeaders',
    mockHeaders: handlers.map((n) => n.info.header),
  };
};

const postMsg = (registration: ServiceWorkerRegistration, handlers: HttpHandler[]) => {
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

export const enableMocking = async (handlers: HttpHandler[], options?: StartOptions) => {
  const scriptURL = `${import.meta.env.BASE_URL || ''}/mockServiceWorker.js`.replace(
    /\/{2,}/g,
    '/',
  );
  const worker = setupWorker(...handlers);

  if (import.meta.env.DEV) {
    globalThis.__msw_worker = worker;
  }

  const serviceWorkerRegistration = await worker.start({
    onUnhandledRequest: 'bypass',
    // quiet: true,
    serviceWorker: {
      url: scriptURL,
      options: {
        updateViaCache: 'none',
      },
    },
    ...options,
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
