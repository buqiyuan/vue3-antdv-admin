const path = require('path')

/********************************自动导包 start********************************/
const file = require.context('./', true, /\.ts/);
const modules = {};
file.keys().forEach((key) => {
    const name = path.basename(key, '.ts');
    modules[name] = file(key).default || file(key);
});
/********************************自动导包 end********************************/

export default modules
