import { handlers, modules, genHandlers, getMockHeaders } from './handlers';
import type { SetupWorker } from 'msw/browser';

let worker: SetupWorker;

if (import.meta.hot) {
  // 当 Mock 文件被修改时
  import.meta.hot.on('mockServer:update-mock-file', async ({ path }) => {
    // console.log('mockServer:update-mock-file', path);
    const module = await import(/* @vite-ignore */ `/${path}?t=${Date.now()}`);
    for (const key in modules) {
      if (path.includes(key.slice(1))) {
        modules[key] = module.default;
        handlers.splice(0, handlers.length, ...genHandlers(modules));
        worker.resetHandlers(...handlers);
        navigator.serviceWorker.controller?.postMessage(genMessage());
        // console.log('handlers', handlers);
        return;
      }
    }
  });
}

const genMessage = () => {
  return {
    type: 'updateMockHeaders',
    mockHeaders: getMockHeaders(),
  };
};

const initializeMocks = async () => {
  if (typeof window === 'undefined') {
    // const { server } = await import('./node');
    // server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        // console.log('registration', registration);
        registration.active?.postMessage(genMessage());
      });
    }

    ({ worker } = await import('./browser'));
    worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL || ''}/mockServiceWorker.mjs?t=${Date.now()}`.replace(
          /\/{2,}/g,
          '/',
        ),
      },
    });
  }
};

initializeMocks();
