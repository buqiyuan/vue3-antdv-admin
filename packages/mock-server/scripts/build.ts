import path from 'node:path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

(async () => {
  await build({
    root: path.resolve(__dirname, '../'),
    configFile: false,
    build: {
      lib: {
        entry: ['./src/mockServiceWorker.js'], // 设置入口文件
        formats: ['es'],
        name: 'mockServiceWorker', // 起个名字，安装、引入用
        fileName: () => `mockServiceWorker.js`, // 打包后的文件名
      },
      minify: false,
      target: 'esnext',
    },
  });
})();
