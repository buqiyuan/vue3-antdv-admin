import { defineConfig } from 'vite-plus';
import { genLocalMswFile } from './src/buildLocalMswFile';

/**
 * tsdown <0.23 compatibility: resolve external dependency subpaths.
 * Remove `resolveDepSubpath` to preserve subpath imports as written (the new default).
 * https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
 */
const legacyDeps = {
  resolveDepSubpath: true,
} as const;

export default defineConfig(async () => {
  await genLocalMswFile();

  return {
    pack: [
      {
        deps: {
          ...legacyDeps,
          neverBundle: ['vite', 'esbuild'],
          dts: {
            neverBundle: ['vite', 'esbuild'],
          },
        },
        entry: ['src/index.ts'],
        sourcemap: true,
        dts: true,
        outDir: 'dist',
        format: ['esm'],
        outExtensions() {
          return { js: '.js', dts: '.d.ts' };
        },
      },
      {
        entry: ['src/browser/index.ts'],
        outDir: 'dist/browser',
        format: ['esm'],
        dts: true,
        platform: 'browser',
        minify: false,
        deps: {
          ...legacyDeps,
          neverBundle: ['virtual:vite-plugin-msw'],
        },
      },
      {
        deps: {
          ...legacyDeps,
          alwaysBundle: ['msw', '@mswjs/interceptors', 'strict-event-emitter'],
        },
        entry: ['src/mockServiceWorker.js'],
        outDir: 'dist',
        format: ['esm'],
        platform: 'browser',
        minify: false,
        outExtensions() {
          return {
            js: '.js',
          };
        },
      },
    ],
  };
});
