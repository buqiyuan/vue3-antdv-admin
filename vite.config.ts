import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import { viteMockServe } from 'vite-plugin-mock';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import dayjs from 'dayjs';
import pkg from './package.json';
import type { UserConfig, ConfigEnv } from 'vite';

const CWD = process.cwd();

// 环境变量
// const BASE_ENV_CONFIG = loadEnv('', CWD);
// const DEV_ENV_CONFIG = loadEnv('development', CWD);
// const PROD_ENV_CONFIG = loadEnv('production', CWD);

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD);

  const isBuild = command === 'build';

  return {
    base: VITE_BASE_URL,
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    plugins: [
      vue(),
      Unocss(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),

      legacy({
        targets: ['defaults', 'not IE 11', 'chrome 79', 'maintained node versions'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // 根据你自己需要导入相应的polyfill:  https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#polyfill-specifiers
        modernPolyfills: ['es.promise.finally', 'es/array', 'es/map', 'es/set'],
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(CWD, 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'svg-icon-[dir]-[name]',
      }),
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        logger: true,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer';

          setupProdMockServer();
          `,
      }),
      Components({
        dts: 'types/components.d.ts',
        types: [
          {
            from: './src/components/basic/button/',
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
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"', // for example, lint .ts & .tsx
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
          additionalData: `
            @primary-color: #00b96b; 
            @header-height: 60px; 
          `,
        },
        // scss: {
        //   additionalData: `
        //   @use 'sass:math';
        //   @import "src/styles/global.scss";
        //   `,
        // },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088,
      proxy: {
        '/api': {
          target: 'https://nest-api.buqiyuan.site/api/',
          // target: 'http://localhost:7001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ws-api': {
          target: 'wss://nest-api.buqiyuan.site',
          // target: 'http://localhost:7002',
          changeOrigin: true, //是否允许跨域
          ws: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        'lodash-es',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
      supported: {
        // https://github.com/vitejs/vite/pull/8665
        'top-level-await': true,
      },
    },
    build: {
      target: 'es2017',
      minify: 'esbuild',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 2000,
    },
  };
};
