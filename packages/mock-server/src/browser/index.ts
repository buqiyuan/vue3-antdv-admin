import { setupWorker } from 'msw/browser';
import { ClientHotUpdater } from './ClientHotUpdater';

const worker = setupWorker();

const clientHotUpdater = new ClientHotUpdater(worker);
clientHotUpdater.init();

worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: `${import.meta.env.BASE_URL || ''}/mockServiceWorker.mjs?t=${Date.now()}`.replace(
      /\/{2,}/g,
      '/',
    ),
  },
});

if (import.meta.env.DEV) {
  globalThis.__msw_worker = worker;
}
