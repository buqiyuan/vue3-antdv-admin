import { resolve } from 'node:path';
import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';

const sourceDir = resolve(__dirname, '../../src');

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  resolve: {
    alias: [
      {
        find: '@',
        replacement: sourceDir,
      },
    ],
  },
  esbuild: {
    drop: ['debugger'],
    pure: ['console.log'],
  },
  // 打包配置
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './index.ts'), // 设置入口文件
      formats: ['es'],
      name: 'components', // 起个名字，安装、引入用
      fileName: (format) => `index.${format}.js`, // 打包后的文件名
    },
    rollupOptions: {
      treeshake: true,
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'ant-design-vue'],
      output: {
        // minifyInternalExports: false,
        //   // Provide global variables to use in the UMD build
        //   // for externalized deps
        //   globals: {
        //     vue: 'Vue',
        //     'ant-design-vue': 'AntDesignVue',
        //   },
        // manualChunks: {
        //   library: ['lodash-es', 'vue-i18n'],
        // },
        manualChunks(id) {
          if (id.includes('/src/locales/helper.ts')) {
            console.log('id: ', id);
            return 'vendor';
          } else if (id.includes('ant-design-vue')) {
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    Unocss(),
    myPlugin(),
    Components({
      dts: false,
      dirs: ['../../src/components'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
          exclude: ['Button'],
        }),
        (componentName) => {
          // where `componentName` is always CapitalCase
          if (componentName === 'AButton') {
            return { name: componentName, from: resolve(sourceDir, 'components/basic/button/') };
          }
        },
      ],
    }),
  ],
});

function myPlugin(): PluginOption {
  const file = resolve(sourceDir, './permission');

  return {
    name: '@admin-pkg/components:transform-file',

    // transform(src, id) {
    //   if (id.includes(file)) {
    //     console.log('transform id: ', id);
    //     return {
    //       code: `export const hasPermission = () => true`,
    //       map: null,
    //     };
    //   }
    // },
    load(id) {
      if (id.includes(file)) {
        console.log('load id: ', id);
        return `export const hasPermission = () => true`;
      }
    },
  };
}
