// generate components map
export const constantRouterComponents = {};

// auto load
const modulesFiles = import.meta.glob<Recordable>('./**/*.ts', { eager: true });

Object.keys(modulesFiles).forEach((path) => {
  if (path.startsWith('./index.')) return;
  const value = modulesFiles[path].default;

  // mouted
  Object.entries(value).forEach(([path, comp]) => {
    constantRouterComponents[path] = comp;
  });
});

console.log('constantRouterComponents', constantRouterComponents);
