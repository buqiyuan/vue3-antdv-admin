import { join } from 'node:path';
import chokidar from 'chokidar';
import { PluginOptions } from '../types';
import { DEFAULT_MOCK_DIR, extensions, mockServerEvent } from '../constants';
import type { FSWatcher } from 'chokidar';
import type { ViteDevServer } from 'vite';

export class MockFileWatcher {
  watcher!: FSWatcher;

  constructor(
    private server: ViteDevServer,
    public options: PluginOptions,
  ) {
    this.server.ws.on('close', () => {
      this.close();
    });
  }

  isClientReady() {
    return new Promise((resolve) => {
      const cb = (data) => {
        this.server.ws.off(mockServerEvent.clientReady, cb);
        resolve(data);
      };
      this.server.ws.on(mockServerEvent.clientReady, cb);
    });
  }

  async start() {
    await this.isClientReady();
    console.log('isClientReady');

    const { mockDir = DEFAULT_MOCK_DIR } = this.options;

    const watchPaths = `${join(mockDir!, `./**/*.{${extensions.join(',')}}`)}`;
    console.log('watchPaths', watchPaths);
    // Initialize watcher.
    this.watcher = chokidar.watch(watchPaths, {
      ignored: /(^|[/\\])\../, // ignore dotfiles
      persistent: true,
    });

    this.watcher.on('add', (path) => {
      this.server.ws.send(mockServerEvent.add, { path });
      console.log(`File ${path} has been add`);
    });

    // mock 文件变更时，通知前端 Mock Service Worker 更新 Mock 路由系统数据
    this.watcher.on('change', (path) => {
      this.server.ws.send(mockServerEvent.update, { path });
      console.log(`File ${path} has been changed`);
    });

    this.watcher.on('unlink', async (path) => {
      this.server.ws.send(mockServerEvent.remove, { path });
      console.log(`File ${path} has been unlink`);
    });
  }

  async restart() {
    await this.close();
    await this.start();
  }

  async close() {
    await this.watcher?.close();
  }
}
