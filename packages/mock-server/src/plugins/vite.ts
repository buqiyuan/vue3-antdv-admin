import { copyFile } from 'node:fs';
import { join } from 'node:path';
import { PluginOptions } from '../types';
import { DEFAULT_MOCK_DIR, extensions } from '../constants';
import { MockFileWatcher } from './MockFileWatcher';
import type { Plugin, ResolvedConfig } from 'vite';

export default (options: PluginOptions = {}): Plugin => {
  const virtualModuleId = 'virtual:vite-plugin-msw';
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  let resolvedConfig: ResolvedConfig;
  // const { mockDir = 'mocks' } = options;
  options.mockDir ||= DEFAULT_MOCK_DIR;

  return {
    name: 'vite-plugin-msw',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const { pathname } = new URL(options.mockDir!, 'http://localhost');
        return `
          const modules = import.meta.glob('${pathname}/**/*.{${extensions.join(',')}}', {
            eager: true,
          }); 

          export const mockModules = Object.entries(modules).reduce((prev, [key, value]) => {
            if (Array.isArray(value?.default)) {
              prev[key] = value.default;
            }
            return prev;
          }, {});
        `;
      }
      return;
    },
    // config() {
    //   return {
    //     define: {
    //       __VITE_PLUGIN_MSW_OPTIONS__: options,
    //     },
    //   };
    // },
    // transformIndexHtml: {
    //   order: 'pre',
    //   handler(html) {
    //     const scriptStr = `
    //       <script type="module">
    //         import '@admin-pkg/mock-server';
    //       </script>
    //     `;
    //     return html.replace(/<body>/, `<body>${scriptStr}`);
    //   },
    // },
    configResolved(config) {
      resolvedConfig = config;
      resolvedConfig;
      // console.log('resolvedConfig', resolvedConfig);

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
      let mockFileWatcher: MockFileWatcher;

      server.ws.on('connection', async () => {
        if (mockFileWatcher) {
          return;
        }

        mockFileWatcher = new MockFileWatcher(server, options);
        mockFileWatcher.start();
      });
    },
    // apply: 'serve',
  };
};
