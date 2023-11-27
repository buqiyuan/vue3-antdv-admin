import { join } from 'node:path';
import chokidar from 'chokidar';
import { PluginOptions } from '../types';
import { mockServerEvent } from '../constants';
import type { FSWatcher } from 'chokidar';
import type { ViteDevServer } from 'vite';

const extensions = ['ts', 'js', 'mjs', 'cjs', 'cts', 'mts'];

export class MockFileWatcher {
  watcher!: FSWatcher;

  constructor(
    private server: ViteDevServer,
    public options: PluginOptions,
  ) {
    this.options = {
      mockDir: 'mocks',
      ...this.options,
    };

    this.server.ws.on('close', () => {
      this.close();
    });
  }

  isClientReady() {
    return new Promise((resolve) => {
      this.server.ws.on(mockServerEvent.clientReady, (data) => {
        resolve(data);
      });
    });
  }

  async start() {
    await this.isClientReady();

    const { mockDir } = this.options;

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
