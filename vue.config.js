const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require('compression-webpack-plugin');
// 去除console
const TerserPlugin = require('terser-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir); // 路径

process.env.VUE_APP_VERSION = require('./package.json').version;

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// const IS_DEV = ['development'].includes(process.env.NODE_ENV);

// port = 8098 npm run dev OR npm run dev --port = 8098
const port = process.env.port || process.env.npm_config_port || 8098; // dev port

module.exports = defineConfig({
  // lintOnSave: false, //关闭eslint检查
  // publicPath: isDev ? '' : querystring.unescape('<%=request.getContextPath()%>'),
  publicPath: process.env.BASE_URL,
  // filenameHashing: false,
  productionSourceMap: false,
  css: {
    // requireModuleExtension: true, // 是否开启CSSmodule并保留xxx.module.css后缀
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          strictMath: false,
          noIeCompat: true,
          modifyVars: {
            '@header-height': '64px',
            '@footer-height': '70px',
          },
        },
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
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/));
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, (config) => config.devtool('cheap-source-map'));

    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set('@', resolve('src'));
    // 打包分析
    if (IS_PROD) {
      // config.optimization.delete('splitChunks');
      // config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      //   {
      //     analyzerMode: 'static',
      //   },
      // ]);
    }
    config.plugin('html').tap((args) => {
      args[0].title = 'vue3-antd-admin管理系统';
      return args;
    });

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
        symbolId: 'icon-[name]',
      });
    config.when(IS_PROD, (config) => {
      // loadsh
      config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin());
      // gzipped
      // config.plugin('CompressionPlugin').use(
      //   new CompressionPlugin({
      //     algorithm: 'gzip',
      //     test: /\.(js|css)$/, // 匹配文件名
      //     threshold: 10240, // 对超过10k的数据压缩
      //     deleteOriginalAssets: false, // 不删除源文件
      //     minRatio: 0.8, // 压缩比
      //   }),
      // );
      // split
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true, // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single');
    });
  },
  configureWebpack: (config) => {
    // 开启顶级await
    config.experiments = {
      topLevelAwait: true,
    };

    config.resolve.fallback = { path: require.resolve('path-browserify') };

    if (IS_PROD) {
      config.plugins.push(
        new TerserPlugin({
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
          parallel: true,
        }),
      );
    }
  },
  devServer: {
    port: port,
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
        target: 'http://175.24.200.3:7001',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
      },
      '/ws-api': {
        target: 'ws://175.24.200.3:7002',
        changeOrigin: true, //是否允许跨域
        ws: true,
      },
    },
    onBeforeSetupMiddleware: require('./src/mock/mock-server.js'),
  },
});
