import { matchRequestUrl } from 'msw';
// import { log } from './log';

const isStringEqual = (actual: string, expected: string) => {
  return actual.toLowerCase() === expected.toLowerCase();
};

const matchMethod = (method, actualMethod: string) => {
  return method instanceof RegExp ? method.test(actualMethod) : isStringEqual(method, actualMethod);
};

/**
 * 判断请求是否为 Mock 请求
 * @see https://github.com/mswjs/msw/blob/main/src/core/handlers/HttpHandler.ts#L127-L131
 */
export const isMatchHandler = (request: Request) => {
  const url = new URL(request.url);
  const mockHeaders: string[] = globalThis.mockHeaders || [];
  // log('mockHeaders', mockHeaders);
  return mockHeaders.some((n) => {
    const [method, path] = n.split(' ');

    const hasMatchingMethod = matchMethod(method, request.method);
    const hasMatchingUrl = matchRequestUrl(url, path, url.origin).matches;
    // log(n, '===', hasMatchingMethod && hasMatchingUrl);
    return hasMatchingMethod && hasMatchingUrl;
  });
};

// 参考自官方的匹配方法 import { getResponse } from 'msw/lib/core/utils/getResponse';
// 由于在 Service worker 监听 fetch 时的回调函数的 respondWith 只能是同步调用，所以不能通过异步的方式做判断
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
