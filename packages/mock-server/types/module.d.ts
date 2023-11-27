declare module 'virtual:vite-plugin-msw' {
  import type { RequestHandler } from 'msw';
  export const mockModules: Record<string, RequestHandler[]>;
}
