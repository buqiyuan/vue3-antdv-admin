import { mockModules } from 'virtual:vite-plugin-msw';
import { mockServerEvent } from '../constants';
import { log } from '../utils/log';
import type { RequestHandler } from 'msw';
import type { SetupWorker } from 'msw/browser';

export class ClientHotUpdater {
  moduleCache = new Map<string, RequestHandler[]>();
  handlers: RequestHandler[] = [];

  constructor(private worker: SetupWorker) {
    this.updateHandlers(Object.values(mockModules));
    this.resetHandlers();

    // log('mockModules', mockModules);
    // log('handlers', this.handlers);
  }

  init(registration?: ServiceWorkerRegistration) {
    const postMsg = (registration: ServiceWorkerRegistration) => {
      registration.active?.postMessage(this.genMessage());
      registration.addEventListener('updatefound', () => {
        registration.active?.postMessage(this.genMessage());
        log('Service Worker update found!');
      });
    };

    if (registration) {
      postMsg(registration);
    } else if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        // log('serviceWorker ready', registration, this.genMessage());
        postMsg(registration);
      });
    }

    // 此代码仅在开发阶段有效
    if (import.meta.hot) {
      // 通知插件服务端，前端已就绪
      import.meta.hot.send(mockServerEvent.clientReady);

      // 当 Mock 文件添加时
      import.meta.hot.on(mockServerEvent.add, async ({ path }) => {
        log('mockServer:add-mock-file', path);
        const module = await import(/* @vite-ignore */ `/${path}?t=${Date.now()}`);
        this.moduleCache.set(path, module.default);
        this.updateHandlersAndInformSW();
      });
      // 当 Mock 文件被修改时
      import.meta.hot.on(mockServerEvent.update, async ({ path }) => {
        log('mockServer:update-mock-file', path);
        const module = await import(/* @vite-ignore */ `/${path}?t=${Date.now()}`);

        this.moduleCache.set(path, module.default);
        this.updateHandlersAndInformSW();
      });
      // 当 Mock 文件被删除时
      import.meta.hot.on(mockServerEvent.remove, async ({ path }) => {
        log('mockServer:remove-mock-file', path);
        this.moduleCache.delete(path);
        this.updateHandlersAndInformSW();
      });
    }
  }

  resetHandlers() {
    this.worker.resetHandlers(...this.handlers);
  }

  updateHandlers(_modules?: RequestHandler[][]) {
    const modules = _modules || [...this.moduleCache.values()];
    this.handlers = modules
      .flatMap((n) => n)
      .filter((n) => {
        // log(n instanceof HttpHandler);
        return n.constructor.name === 'HttpHandler';
      });
  }

  updateHandlersAndInformSW() {
    this.updateHandlers();
    this.resetHandlers();
    this.sendMsgToSW();
  }

  sendMsgToSW() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.controller?.postMessage(this.genMessage());
    }
  }

  getMockHeaders() {
    return this.handlers.map((n) => n.info.header);
  }

  genMessage() {
    return {
      type: 'updateMockHeaders',
      mockHeaders: this.getMockHeaders(),
    };
  }
}
