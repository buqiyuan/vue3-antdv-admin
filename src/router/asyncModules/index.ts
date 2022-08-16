// generate components map
export const constantRouterComponents = {};

// auto load
const modulesFiles = require.context('.', true, /\.ts$/);

modulesFiles.keys().forEach((path) => {
  if (path.startsWith('./index.')) return;
  const value = modulesFiles(path).default;

  // mouted
  Object.entries(value).forEach(([path, comp]) => {
    constantRouterComponents[path] = comp;
  });
});

console.log('constantRouterComponents', constantRouterComponents);
