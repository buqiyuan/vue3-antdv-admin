import { cp, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, PluginOption } from 'vite';

const require = createRequire(import.meta.url);
const tinymceDir = dirname(require.resolve('tinymce'));

type Options = {
  /** Public path prefix the dev server should serve TinyMCE assets from. */
  baseUrl: string;
  /**
   * TinyMCE directories copied into the production build.
   * @default ['skins/content/default', 'skins/ui/oxide', 'skins/ui/oxide-dark']
   */
  destDir?: string | string[];
};

const defaultDestDir = ['skins/content/default', 'skins/ui/oxide', 'skins/ui/oxide-dark'] as const;

export default (options: Options): PluginOption => {
  const { baseUrl, destDir = defaultDestDir } = options;
  let outDir = 'dist';
  let base = '/';

  const plugin: Plugin = {
    name: 'vite-plugin-tinymce-resource',
    configResolved(config) {
      outDir = config.build.outDir;
      base = config.base;
    },
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => {
        const urlPrefix = `${base}/${baseUrl}`.replace(/\/{2,}/, '/');
        if (!req.url?.startsWith(urlPrefix)) {
          next();
          return;
        }
        try {
          const url = resolve(tinymceDir, req.url.replace(urlPrefix, ''));
          const content = await readFile(url);
          res.setHeader('Content-Type', 'text/css');
          res.end(content);
        }
        catch (error) {
          console.error(error);
          res.statusCode = 500;
          res.end(String(error));
        }
      });
    },
    closeBundle() {
      const dirs = Array<string>().concat(destDir);
      for (const dir of dirs) {
        const sourceDir = resolve(tinymceDir, dir);
        const destinationDir = resolve(outDir, `./${baseUrl}`, dir);
        void cp(sourceDir, destinationDir, { recursive: true, force: true }).catch((error: unknown) => {
          console.error('[@admin-pkg/vite-plugin-tinymce-resource]: ', error);
        });
      }
    },
  };

  return plugin;
};
