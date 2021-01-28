const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
// 去除console
const UglifyJsPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path')
const resolve = dir => path.join(__dirname, dir) // 路径
const querystring = require('querystring');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    // publicPath: isDev ? '' : querystring.unescape('<%=request.getContextPath()%>'),
    publicPath: process.env.BASE_URL,
    // filenameHashing: false,
    productionSourceMap: isDev,
    css: {
        requireModuleExtension: true, // 是否开启CSSmodule并保留xxx.module.css后缀
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            sass: {additionalData: `@import "@/styles/global.scss";`}
        }
    },
    chainWebpack: config => {
        // 配置相关loader，支持修改，添加和替换相关的loader
        config.resolve.alias
            .set('@', resolve('src'))
        // 打包分析
        if (!isDev) {
            // config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
            //   {
            //     analyzerMode: 'static'
            //   }
            // ])
        }
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'vue3-antd-admin管理系统'
                return args
            })

        // svg rule loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    configureWebpack: config => {
        if (!isDev) {
            config.plugins.push(
                new UglifyJsPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            drop_debugger: true, // 注释console
                            drop_console: true,
                            pure_funcs: ['console.log'] // 移除console
                        }
                    },
                    extractComments: false, // 是否将注释提取到一个单独的文件中
                    sourceMap: false,
                    parallel: true
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
            )
            // config.plugins.push(new LodashModuleReplacementPlugin())
            config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))
            // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

            config.optimization = {
                splitChunks: {
                    minSize: 1000000, // 单个文件的最小size
                    maxSize: 2000000, // 单个文件最大的size
                    minChunks: 2, // 最小被引用
                    maxAsyncRequests: 5, // 首页加载资源
                    maxInitialRequests: 3,
                    automaticNameDelimiter: '~', // 打包文件自定义的链接符
                    name: true,
                    chunks: 'async', // initial(初始块)、async(按需加载块)、all(默认，全部块)
                    // 这里需要注意的是如果使用initial 会将首页需要的依赖和项目本身的依赖打包2次增大文件体积
                    cacheGroups: {
                        default: false,
                        vendor: {
                            test(module) {
                                let path = module.resource
                                if (!path) return true
                                path = path.replace(/\\/g, '/')
                                const isNeed = path &&
                                    /node_modules/.test(path) &&
                                    /node_modules\/(?!ant-design-vue)/.test(path)
                                if (!isNeed && path.indexOf('node_modules') > -1) {
                                    console.log('vendor not need::', path, isNeed)
                                }
                                return isNeed
                            },
                            name: 'chunk-vendors',
                            priority: 10,
                            enforce: true
                        },
                        vue: {
                            test(module) {
                                let path = module.resource
                                if (!path) return false
                                path = path.replace(/\\/g, '/')
                                // return path && path.indexOf('node_modules') > -1 && path.indexOf('vuetify') > -1
                                return path && /node_modules\/vue/.test(path)
                            },
                            name: 'chunk-vuetify',
                            priority: 9,
                            enforce: true
                        },
                        common: {
                            name: 'chunk-common',
                            minChunks: 2,
                            minSize: 30000
                        }
                    }
                }
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_URL1,
                // target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
