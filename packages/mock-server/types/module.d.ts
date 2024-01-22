declare module 'virtual:vite-plugin-msw' {
  import type { HttpHandler } from 'msw';
  export const mockModules: Record<string, HttpHandler[]>;
}
