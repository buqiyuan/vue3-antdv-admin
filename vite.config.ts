import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// import styleImport from 'vite-plugin-style-import';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import WindiCSS from 'vite-plugin-windicss';
import viteSvgIcons from 'vite-plugin-svg-icons';

const CWD = process.cwd();

// 环境变量
// const BASE_ENV_CONFIG = loadEnv('', CWD);
// const DEV_ENV_CONFIG = loadEnv('development', CWD);
// const PROD_ENV_CONFIG = loadEnv('production', CWD);

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD);

  const isBuild = command === 'build';
  console.log('当前执行环境：', isBuild);

  return {
    base: VITE_BASE_URL,
    esbuild: {
      // target: 'es2015'
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
      WindiCSS(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      viteSvgIcons({
        // Specify the icon folder to be cached
        iconDirs: [resolve(CWD, 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'svg-icon-[dir]-[name]',
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            exclude: ['AButton'],
          }),
        ],
      }),
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: 'ant-design-vue',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `ant-design-vue/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
    ],
    css: {
      preprocessorOptions: {
        // less: {
        //   modifyVars: {},
        //   javascriptEnabled: true,
        // },
        less: {
          javascriptEnabled: true,
          strictMath: false,
          noIeCompat: true,
          modifyVars: {
            '@header-height': '64px',
            '@footer-height': '70px',
          },
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
      port: 8088,
      proxy: {
        '/api': {
          target: 'http://buqiyuan.site:7001',
          // target: 'http://localhost:7001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ws-api': {
          target: 'ws://buqiyuan.site:7002',
          changeOrigin: true, //是否允许跨域
          ws: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@ant-design/icons-vue',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
      exclude: ['vue-demi'],
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },
  };
};
