// auto load
const modulesFiles = import.meta.glob<Recordable>('../../views/**/*.vue');
// console.log('modulesFiles', modulesFiles);

// generate components map
export const asyncRoutes = Object.entries(modulesFiles).reduce((routes, [url, importFn]) => {
  if (!/\/(login|components)\//.test(url)) {
    const path = url.replace('../../views/', '');
    routes[path] = importFn;
  }

  return routes;
}, {});

console.log('asyncRoutes', asyncRoutes);
