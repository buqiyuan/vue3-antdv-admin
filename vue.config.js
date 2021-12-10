const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require('compression-webpack-plugin');
// 去除console
const TerserPlugin = require('terser-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir); // 路径

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_DEV = ['development'].includes(process.env.NODE_ENV);

// port = 8098 npm run dev OR npm run dev --port = 8098
const port = process.env.port || process.env.npm_config_port || 8098; // dev port

module.exports = {
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
      config.optimization.delete('splitChunks');
      // config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      //   {
      //     analyzerMode: 'static'
      //   }
      // ])
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
  },
  configureWebpack: (config) => {
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
        // new CompressionPlugin({
        //     /* [file]被替换为原始资产文件名。
        //        [path]替换为原始资产的路径。
        //        [dir]替换为原始资产的目录。
        //        [name]被替换为原始资产的文件名。
        //        [ext]替换为原始资产的扩展名。
        //        [query]被查询替换。*/
        //     filename: '[path].gz[query]',
        //     //压缩算法
        //     algorithm: 'gzip',
        //     //匹配文件
        //     test: /\.js$|\.css$|\.html$/,
        //     //压缩超过此大小的文件,以字节为单位
        //     threshold: 10240,
        //     minRatio: 0.8,
        //     //删除原始文件只保留压缩后的文件
        //     deleteOriginalAssets: true
        // })
      );
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: 'chunk-common',
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true,
            },
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 2,
              reuseExistingChunk: true,
              enforce: true,
            },
            antd: {
              name: 'chunk-ant-design-vue',
              test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
              chunks: 'all',
              priority: 3,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return {
      devtool: IS_DEV ? 'source-map' : false,
      experiments: {
        // lazyCompilation: true,
        topLevelAwait: true,
      },
    };
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
        target: 'http://localhost:7001',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    onBeforeSetupMiddleware: require('./src/mock/mock-server.js'),
  },
};
