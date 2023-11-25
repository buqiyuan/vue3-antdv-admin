import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // 打包配置
  build: {
    lib: {
      entry: ['./src/plugins/vite.ts'], // 设置入口文件
      formats: ['cjs'],
      // name: 'mock-server', // 起个名字，安装、引入用
      fileName: (format) => `plugin.${format}.js`, // 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
  },
});
