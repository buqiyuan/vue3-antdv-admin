import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/plugins/vite.ts'],
    splitting: false,
    sourcemap: true,
    // clean: ['!mockServiceWorker.*'],
    dts: true,
    outDir: 'dist',
    format: ['cjs', 'esm'],
  },
  {
    entry: ['src/index.ts'],
    splitting: false,
    outDir: 'dist',
    format: ['esm'],
    /**
     * fix build msw/browser err
     * @see: https://github.com/egoist/tsup/issues/978
     */
    platform: 'browser',
    minify: false,
  },
  {
    entry: ['src/mockServiceWorker.js'],
    splitting: false,
    outDir: 'dist',
    format: ['esm'],
    platform: 'browser',
    minify: false,
  },
]);
