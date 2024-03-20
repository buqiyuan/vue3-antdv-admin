import { cp, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import type { PluginOption } from 'vite';

const require = createRequire(import.meta.url);

const tinymceDir = dirname(require.resolve('tinymce'));
let outDir: string;
let base: string;

type Options = {
  /** Public Dir  */
  baseUrl: string;
  /**
   * 要复制的目标文件夹
   * @default: ['skins/content/default', 'skins/ui/oxide', 'skins/ui/oxide-dark']
   **/
  destDir?: string | string[];
};

const defaultDestDir = ['skins/content/default', 'skins/ui/oxide', 'skins/ui/oxide-dark'] as const;

export default (options: Options): PluginOption => {
  const { baseUrl, destDir = defaultDestDir } = options;

  return {
    name: 'vite-plugin-tinymce-resource',
    configResolved(config) {
      outDir = config.build.outDir;
      base = config.base;
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPrefix = `${base}/${baseUrl}`.replace(/\/{2,}/, '/');
        if (!req.url?.startsWith(urlPrefix)) {
          return next();
        }
        try {
          const url = resolve(tinymceDir, req.url.replace(urlPrefix, ''));
          const content = await readFile(url);
          // console.log('req.url', req.url);
          res.setHeader('Content-Type', 'text/css');
          res.end(content);
        } catch (error) {
          console.error(error);
          res.statusCode = 500;
          res.end(error.toString());
        }
      });
    },
    async closeBundle() {
      Array<string>()
        .concat(destDir)
        .forEach(async (dir) => {
          const sourceDir = resolve(tinymceDir, dir);
          const destinationDir = resolve(outDir, `./${baseUrl}`, dir);
          // console.log(sourceDir);
          // console.log(destinationDir);

          try {
            await cp(sourceDir, destinationDir, { recursive: true, force: true });
          } catch (error) {
            console.error('[@admin-pkg/vite-plugin-tinymce-resource]: ', error);
          }
        });
    },
  };
};
