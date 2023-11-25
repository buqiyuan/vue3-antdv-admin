import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/plugins/vite.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
});
