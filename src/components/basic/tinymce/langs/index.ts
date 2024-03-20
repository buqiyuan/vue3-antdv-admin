const modules = import.meta.glob('./*.js', { query: '?url', eager: true, import: 'default' });

export default Object.entries(modules).reduce((prev, [key, value]) => {
  const name = key.replace(/\.\/(.+)\.js/, '$1');
  prev[name] = value;
  return prev;
}, {});
