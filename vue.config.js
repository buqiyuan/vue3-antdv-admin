const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const dayjs = require('dayjs');
const TerserPlugin = require('terser-webpack-plugin');
const defineOptions = require('unplugin-vue-define-options/webpack');

const resolve = (dir) => path.join(__dirname, dir); // 路径
const pkg = require('./package.json');

process.env.VUE_APP_VERSION = pkg.version;

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_DEV = ['development'].includes(process.env.NODE_ENV);

// port = 8098 npm run dev OR npm run dev --port = 8098
const port = process.env.port || process.env.npm_config_port || 8098; // dev port

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://next.cli.vuejs.org/
module.exports = defineConfig({
  lintOnSave: IS_DEV, //关闭eslint检查
  // publicPath: isDev ? '' : querystring.unescape('<%=request.getContextPath()%>'),
  publicPath: process.env.BASE_URL,
  // filenameHashing: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // css: {
      //   modules: {
      //     auto: (path) => {
      //       return path.includes('ant-design-vue/dist/antd.dark.css');
      //     },
      //   },
      // },
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        additionalData: `
          @import "ant-design-vue/lib/style/themes/default.less";
          @import "~@/styles/variables.less";
      `,
      },
      // sass: {
      //   additionalData: `
      //   @use 'sass:math';
      //   @import "@/styles/global.scss";`
      // }
    },
  },
  chainWebpack: (config) => {
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');

    // 优化二次启动速度
    config.cache({
      // 将缓存类型设置为文件系统,默认是memory
      type: 'filesystem',
      buildDependencies: {
        // 更改配置文件时，重新缓存
        config: [__filename],
      },
    });
    // https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
    config.optimization.runtimeChunk('single');

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(IS_DEV, (config) => config.devtool('cheap-source-map'));

    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
    if (process.env.DEBUG_ANTDV) {
      console.info('DEBUG_ANTDV', process.env.DEBUG_ANTDV);
      config.resolve.alias.set('ant-design-vue/es/', 'ant-design-vue/components/');
      config.resolve.alias.set('ant-design-vue/lib/', 'ant-design-vue/components/');
      config.resolve.alias.set('vue', 'ant-design-vue/node_modules/vue');
    }

    config.plugin('html').tap((args) => {
      args[0].title = 'vue3-antd-admin管理系统';
      return args;
    });

    config.module
      .rule('css')
      .exclude.add(resolve('node_modules/ant-design-vue/dist/antd.dark.css'))
      .end();
    config.module.rule('raw-css').resourceQuery(/raw/).type('asset/source');

    // 忽略解析markdown文件
    config.module.noParse(/\.md$/);

    // config.module.rule('css').test(/\.ts$/).resourceQuery(/raw/).type('asset/source').end();
    // svg rule loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'svg-icon-[name]',
      });
    config.when(IS_PROD, (config) => {
      // split
      config.optimization.splitChunks({
        chunks: 'all', //指定哪些模块需要打包
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          antdv: {
            name: 'chunk-ant-design-vue', // split ant-design-vue into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, // 被引用3次就提取出来
            priority: 5,
            reuseExistingChunk: true, // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
        },
      });
      config.module
        .rule('md')
        .test(/\.md$/)
        .type('javascript/auto')
        .use('asset')
        .loader('asset')
        .options({
          limit: 100,
          esModule: false,
          generator: () => '',
        });
    });
  },
  configureWebpack: (config) => {
    // 开启顶级await
    config.experiments = {
      topLevelAwait: true,
    };
    config.resolve.fallback = { path: require.resolve('path-browserify') };

    config.plugins.push(
      // 定义全局变量
      new webpack.DefinePlugin({
        __APP_INFO__: JSON.stringify(__APP_INFO__),
      }),
      // 打包速度分析
      new SpeedMeasurePlugin(),
      // use defineOptions https://github.com/sxzz/unplugin-vue-define-options
      defineOptions({
        include: [/\.vue$/, /\.vue\?vue/],
      }),
    );

    if (IS_PROD) {
      // terser-webpack-plugin (https://webpack.docschina.org/plugins/terser-webpack-plugin/);
      const TerserPluginIndex = config.optimization.minimizer.findIndex(
        (n) => n.__pluginName === 'terser',
      );
      config.optimization.minimizer[TerserPluginIndex] = new TerserPlugin({
        terserOptions: {
          warnings: false,
          format: {
            comments: false,
          },
          compress: {
            drop_debugger: true, // 注释console
            drop_console: true,
            pure_funcs: ['console.log'], // 移除console
          },
        },
        extractComments: false, // 是否将注释提取到一个单独的文件中
        parallel: true, // 是否并⾏打包
      });
    }
  },
  devServer: {
    port,
    client: {
      progress: true,
    },
    // watchOptions: {
    //   // 开发时，自动保存代码导致构建频繁且会报错，又不想手动保存，则可以开启延迟构建
    //   aggregateTimeout: 1500,
    //   ignored: /node_modules/,
    // },
    proxy: {
      // '/mock-api': {
      //   target: `http://localhost:${port}`,
      //   changeOrigin: true,
      //   logLevel: 'debug',
      //   pathRewrite: {
      //     '^/mock-api': ''
      //   }
      // },
      '^/api': {
        // target: process.env.VUE_APP_API_URL,
        target: 'https://nest-api.buqiyuan.site/api/',
        // target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
        on: {
          // proxyReq: (proxyReq) => {
          //   // add custom header to request
          //   proxyReq.setHeader('Referer', 'https://vue3-antd-admin.vercel.app');
          // },
        },
      },
      '^/ws-api': {
        target: 'wss://nest-api.buqiyuan.site',
        // target: 'http://127.0.0.1:7002',
        changeOrigin: true, //是否允许跨域
        wss: true,
        logLevel: 'debug',
      },
    },
    setupMiddlewares: require('./src/mock/mock-server.js'),
  },
});
