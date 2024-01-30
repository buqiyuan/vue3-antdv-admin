const modules = import.meta.glob('./*.js', { as: 'url', eager: true });

export default Object.entries(modules).reduce((prev, [key, value]) => {
  const name = key.replace(/\.\/(.+)\.js/, '$1');
  prev[name] = value;
  return prev;
}, {});
