import { matchRequestUrl } from 'msw';

const getBaseUrl = (url: URL) => {
  return new URL(import.meta.env.BASE_URL, url.origin).href;
};

const isStringEqual = (actual: string, expected: string) => {
  return actual.toLowerCase() === expected.toLowerCase();
};

const matchMethod = (method, actualMethod: string) => {
  return method instanceof RegExp ? method.test(actualMethod) : isStringEqual(method, actualMethod);
};

/** 判断请求是否为 Mock 请求 */
export const isMatchHandler = (request: Request) => {
  const url = new URL(request.url);
  const mockHeaders: string[] = globalThis.mockHeaders || [];
  // console.log('mockHeaders', mockHeaders);
  return mockHeaders.some((n) => {
    const [method, path] = n.split(' ');

    const hasMatchingMethod = matchMethod(method, request.method);
    const hasMatchingUrl = matchRequestUrl(url, path, getBaseUrl(url)).matches;

    return hasMatchingMethod && hasMatchingUrl;
  });
};
