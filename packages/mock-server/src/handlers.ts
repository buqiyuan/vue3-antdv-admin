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

// 参考自官方的匹配方法 import { getResponse } from 'msw/lib/core/utils/getResponse';
// const isMatchHandler = async (request: Request) => {
//   let result;

//   for (const handler of handlers) {
//     result = await handler.test({ request });

//     if (result) {
//       return true;
//     }
//   }

//   return handlers.length && result;
// };
