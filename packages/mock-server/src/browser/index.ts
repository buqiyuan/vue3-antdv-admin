import { setupWorker } from 'msw/browser';
import { ClientHotUpdater } from './ClientHotUpdater';

const worker = setupWorker();

const clientHotUpdater = new ClientHotUpdater(worker);
clientHotUpdater.init();

if (import.meta.env.DEV) {
  globalThis.__msw_worker = worker;
}

export const enableMocking = () => {
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL || ''}/mockServiceWorker.mjs`.replace(/\/{2,}/g, '/'),
    },
  });
};
