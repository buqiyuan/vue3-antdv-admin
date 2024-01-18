import { setupWorker } from 'msw/browser';
import { ClientHotUpdater } from './ClientHotUpdater';

export const enableMocking = async () => {
  const worker = setupWorker();

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
  const clientHotUpdater = new ClientHotUpdater(worker);
  clientHotUpdater.init(serviceWorkerRegistration);

  return serviceWorkerRegistration;
};
