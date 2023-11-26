import { copyFile } from 'node:fs';
import { join } from 'node:path';
import chokidar from 'chokidar';
import type { Plugin } from 'vite';

type Options = {
  publicDir?: string;
};

export const partialConfigPlugin = (options: Options = {}): Plugin => {
  console.log('options', options);

  return {
    name: '@bqy:mock-server',
    configResolved(config) {
      const publicDir = options.publicDir || config.publicDir;
      // console.log('publicDir:', publicDir);
      if (publicDir) {
        const sourceFile = join(__dirname, './mockServiceWorker.mjs');
        const destinationFile = join(publicDir, './mockServiceWorker.mjs');

        copyFile(sourceFile, destinationFile, (err) => {
          if (err) {
            console.error('Error copying file:', err);
          } else {
            console.log('File copied successfully.');
          }
        });
      }
    },
    configureServer(server) {
      let watcher;
      server.ws.on('connection', () => {
        if (watcher) {
          return;
        }
        // Initialize watcher.
        watcher = chokidar.watch('packages/**/mocks/*.ts', {
          ignored: /(^|[/\\])\../, // ignore dotfiles
          persistent: true,
        });

        // mock 文件变更时，通知前端 Mock Service Worker 更新 Mock 路由系统数据
        watcher.on('change', (path) => {
          server.ws.send('mockServer:update-mock-file', { path });
          console.log(`File ${path} has been changed`);
        });
      });
    },
    apply: 'serve',
  };
};
