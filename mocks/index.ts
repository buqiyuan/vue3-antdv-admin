import { enableMocking } from '@admin-pkg/vite-plugin-msw';
import { HttpHandler } from 'msw';

const modules = import.meta.glob<any>('./**/*.ts', {
  eager: true,
});

export const setupMock = async () => {
  const handlers = Object.values(modules).reduce<HttpHandler[]>((prev, curr) => {
    const arr = curr?.default;
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item instanceof HttpHandler) {
          prev.push(item);
        }
      });
    }
    return prev;
  }, []);
  // console.log('handlers', handlers);
  await enableMocking(handlers, {
    // 设置为 true 则不会在浏览器控制台输出 log 信息
    quiet: false,
  });
};
