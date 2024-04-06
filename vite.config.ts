import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import mkcert from 'vite-plugin-mkcert';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import dayjs from 'dayjs';
import mockServerPlugin from '@admin-pkg/vite-plugin-msw/vite';
import TinymceResourcePlugin from '@admin-pkg/vite-plugin-tinymce-resource';
import Http2Proxy from '@admin-pkg/vite-plugin-http2-proxy';
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
  const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_MOCK_IN_PROD } = loadEnv(mode, CWD);

  const isDev = command === 'serve';
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
      // 指定 mkcert 的下载源为 coding，从 coding.net 镜像下载证书
      mkcert({ source: 'coding' }),
      // 开启 http2 代理
      Http2Proxy(),
      mockServerPlugin({ build: isBuild && VITE_MOCK_IN_PROD === 'true' }),
      TinymceResourcePlugin({ baseUrl: '/tinymce-resource/' }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(CWD, 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'svg-icon-[dir]-[name]',
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
      isDev &&
        checker({
          typescript: true,
          // vueTsc: true,
          eslint: {
            useFlatConfig: true,
            lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"', // for example, lint .ts & .tsx
          },
          overlay: {
            initialIsOpen: false,
          },
        }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
          // additionalData: `
          //   @import '@/styles/variables.less';
          // `,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088,
      open: true,
      proxy: {
        '^/api': {
          target: 'https://nest-api.buqiyuan.site',
          // target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '^/upload': {
          target: 'https://nest-api.buqiyuan.site/upload',
          // target: 'http://127.0.0.1:7001/upload',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
      // 提前转换和缓存文件以进行预热。可以在服务器启动时提高初始页面加载速度，并防止转换瀑布。
      warmup: {
        // 请注意，只应该预热频繁使用的文件，以免在启动时过载 Vite 开发服务器
        // 可以通过运行 npx vite --debug transform 并检查日志来找到频繁使用的文件
        clientFiles: ['./index.html', './src/{components,api}/*'],
      },
    },
    optimizeDeps: {
      include: ['lodash-es', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US'],
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE === 'true' ? ['console.log', 'debugger'] : [],
      supported: {
        // https://github.com/vitejs/vite/pull/8665
        'top-level-await': true,
      },
    },
    build: {
      minify: 'esbuild',
      cssTarget: 'chrome89',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // minifyInternalExports: false,
          manualChunks(id) {
            //TODO fix circular imports
            if (id.includes('/src/locales/helper.ts')) {
              return 'antdv';
            } else if (id.includes('node_modules/ant-design-vue/')) {
              return 'antdv';
            } else if (/node_modules\/(vue|vue-router|pinia)\//.test(id)) {
              return 'vue';
            }
          },
        },
        onwarn(warning, rollupWarn) {
          // ignore circular dependency warning
          if (
            warning.code === 'CYCLIC_CROSS_CHUNK_REEXPORT' &&
            warning.exporter?.includes('src/api/')
          ) {
            return;
          }
          rollupWarn(warning);
        },
      },
    },
  };
};
