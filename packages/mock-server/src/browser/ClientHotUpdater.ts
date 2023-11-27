import { mockModules } from 'virtual:vite-plugin-msw';
import { mockServerEvent } from '../constants';
import type { SetupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';

export class ClientHotUpdater {
  moduleCache = new Map<string, RequestHandler[]>();
  handlers: RequestHandler[] = [];

  constructor(private worker: SetupWorker) {
    this.handlers = Object.values(mockModules).flatMap((n) => n);
    this.resetHandlers();
  }

  init() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        // console.log('registration', registration, this.genMessage());
        registration.active?.postMessage(this.genMessage());
      });
    }

    // 此代码仅在开发阶段有效
    if (import.meta.hot) {
      // 通知服务端，前端已就绪
      import.meta.hot.send(mockServerEvent.clientReady);

      // 当 Mock 文件添加时
      import.meta.hot.on(mockServerEvent.add, async ({ path }) => {
        // console.log('mockServer:add-mock-file', path);
        const module = await import(/* @vite-ignore */ `/${path}?t=${Date.now()}`);
        this.moduleCache.set(path, module.default);
        this.updateHandlersAndInformSW();
      });
      // 当 Mock 文件被修改时
      import.meta.hot.on(mockServerEvent.update, async ({ path }) => {
        console.log('mockServer:update-mock-file', path);
        const module = await import(/* @vite-ignore */ `/${path}?t=${Date.now()}`);

        this.moduleCache.set(path, module.default);
        this.updateHandlersAndInformSW();
      });
      // 当 Mock 文件被删除时
      import.meta.hot.on(mockServerEvent.remove, async ({ path }) => {
        console.log('mockServer:remove-mock-file', path);
        this.moduleCache.delete(path);
        this.updateHandlersAndInformSW();
      });
    }
  }

  resetHandlers() {
    this.worker.resetHandlers(...this.handlers);
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

  updateHandlers() {
    this.handlers = [...this.moduleCache.values()].flatMap((n) => n);
  }
}
