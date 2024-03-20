import { defineConfig } from 'tsup';
import { genLocalMswFile } from './src/buildLocalMswFile';

export default defineConfig(async () => {
  await genLocalMswFile();

  return [
    {
      entry: ['src/index.ts'],
      splitting: false,
      sourcemap: true,
      // clean: ['!mockServiceWorker.*'],
      dts: true,
      outDir: 'dist',
      format: ['esm'],
    },
    {
      entry: ['src/browser/index.ts'],
      splitting: false,
      outDir: 'dist/browser',
      format: ['esm'],
      dts: true,
      /**
       * fix build msw/browser err
       * @see: https://github.com/egoist/tsup/issues/978
       */
      platform: 'browser',
      minify: false,
      // 排除自定义的 vite 虚拟模块
      external: ['virtual:vite-plugin-msw'],
    },
    {
      entry: ['src/mockServiceWorker.js'],
      splitting: false,
      outDir: 'dist',
      format: ['esm'],
      platform: 'browser',
      minify: false,
      noExternal: ['msw', '@mswjs/interceptors', 'strict-event-emitter'],
      outExtension() {
        return {
          js: `.js`,
        };
      },
    },
  ];
});
