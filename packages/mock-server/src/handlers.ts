import type { RequestHandler } from 'msw';

export const modules = import.meta.glob<RequestHandler[]>('./mocks/*.ts', {
  eager: true,
  import: 'default',
});

export const genHandlers = (modules: Record<string, RequestHandler[]>) => {
  return Object.values(modules).flatMap((n) => n);
};

export const handlers = genHandlers(modules);

export const getMockHeaders = () => {
  return handlers.map((n) => n.info.header);
};
