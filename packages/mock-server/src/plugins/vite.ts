import type { Plugin } from 'vite';

export const partialConfigPlugin = (): Plugin => {
  // const mocks = new Map<string,any[] >()
  const chokidar = require('chokidar');

  return {
    name: '@bqy:mock-server',
    async configureServer(server) {
      let watcher;
      console.log('configureServer');
      server.ws.on('connection', () => {
        if (watcher) {
          return;
        }
        // Initialize watcher.
        watcher = chokidar.watch('packages/**/mocks/*.ts', {
          ignored: /(^|[/\\])\../, // ignore dotfiles
          persistent: true,
        });

        watcher.on('change', (path) => {
          server.ws.send('mockServer:update-mock-file', { path });
          console.log(`File ${path} has been changed`);
        });
      });
    },
  };
};
