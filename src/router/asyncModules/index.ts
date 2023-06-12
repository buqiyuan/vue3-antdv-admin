// generate components map
export const asyncRoutes = require
  .context('@/views', true, /\.vue$/, 'lazy')
  .keys()
  .reduce((routes, url) => {
    if (!/\/(login|components)\//.test(url)) {
      const path = url.replace('./', '');
      // 这里的 `webpackChunkName` 不会生效，需要使用 import.meta.webpackContext 代替 require.context
      routes[path] = () => import(/* webpackChunkName: "[request]" */ `@/views/${path}`);
    }

    return routes;
  }, {});

console.log('asyncRoutes', asyncRoutes);
