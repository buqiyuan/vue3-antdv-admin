import { resolve } from 'node:path';
import mockServerPlugin from '@admin-pkg/vite-plugin-msw/vite';
import TinymceResourcePlugin from '@admin-pkg/vite-plugin-tinymce-resource';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dayjs from 'dayjs';
import Unocss from 'unocss/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite-plus';
import mkcert from 'vite-plugin-mkcert';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import VueDevTools from 'vite-plugin-vue-devtools';
import pkg from './package.json';

const CWD = process.cwd();

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

const DEMO_API_ORIGIN = 'https://nest-admin-api.pages.dev';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, CWD, '');
  const {
    VITE_BASE_URL,
    VITE_DROP_CONSOLE,
    VITE_MOCK_IN_PROD,
    VITE_API_PROXY_TARGET = DEMO_API_ORIGIN,
    VITE_DEV_HTTPS,
    VITE_DEV_OPEN,
  } = env;

  const isBuild = command === 'build';
  const dropConsole = VITE_DROP_CONSOLE === 'true';
  const proxyTarget = VITE_API_PROXY_TARGET || DEMO_API_ORIGIN;

  return {
    base: VITE_BASE_URL,
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(import.meta.dirname, './src'),
        },
      ],
    },
    plugins: [
      vue(),
      VueDevTools(),
      Unocss(),
      vueJsx(),
      VITE_DEV_HTTPS === 'true' && mkcert({ source: 'coding' }),
      mockServerPlugin({ build: isBuild && VITE_MOCK_IN_PROD === 'true' }),
      TinymceResourcePlugin({ baseUrl: '/tinymce-resource/' }),
      createSvgIconsPlugin({
        iconDirs: [resolve(CWD, 'src/assets/icons')],
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
            importStyle: false,
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
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088,
      open: VITE_DEV_OPEN === 'true',
      proxy: {
        '^/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
        '^/upload': {
          target: new URL('/upload', proxyTarget).toString(),
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => path.replace(/^\/upload/, ''),
        },
      },
      warmup: {
        clientFiles: ['./index.html', './src/{components,api}/*'],
      },
    },
    optimizeDeps: {
      include: ['lodash-es', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US'],
    },
    build: {
      target: 'chrome108',
      cssTarget: 'chrome108',
      chunkSizeWarningLimit: 2000,
      rolldownOptions: dropConsole
        ? {
            output: {
              minify: {
                compress: {
                  dropConsole: true,
                  dropDebugger: true,
                },
                mangle: true,
              },
            },
          }
        : undefined,
    },
    // Oxlint does not parse Vue templates. Template rules previously covered by
    // eslint-plugin-vue are enforced by vue-tsc instead.
    lint: {
      ignorePatterns: [
        'dist/**',
        '**/dist/**',
        'public/**',
        'coverage/**',
        'pnpm-lock.yaml',
        'types/components.d.ts',
      ],
      plugins: ['typescript', 'unicorn', 'oxc'],
      categories: {
        correctness: 'error',
      },
      env: {
        builtin: true,
        browser: true,
        node: true,
      },
      rules: {
        'no-console': 'off',
        eqeqeq: 'warn',
      },
    },
    fmt: {
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 100,
    },
    // Legacy sources are not mass-formatted. `vp fmt` still uses the options above.
    check: {
      fmt: false,
    },
  };
});
