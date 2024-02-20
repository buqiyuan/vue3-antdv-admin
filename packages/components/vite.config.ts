import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../../src'),
      },
    ],
  },
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'), // 设置入口文件
      formats: ['es', 'umd'],
      name: 'components', // 起个名字，安装、引入用
      fileName: (format) => `index.${format}.js`, // 打包后的文件名
    },
    rollupOptions: {
      treeshake: true,
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'ant-design-vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'AntDesignVue',
        },
      },
    },
  },

  plugins: [
    vue(),
    vueJsx(),
    Unocss(),
    Components({
      dts: false,
      types: [
        {
          from: '@/components/basic/button/',
          names: ['AButton'],
        },
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
          exclude: ['Button'],
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
        additionalData: `
          @import '@/styles/variables.less'; 
        `,
      },
    },
  },
});
