

const path = require('path');
const defaultSettings = require('./src/settings.js');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '交易报告'; // page title
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  publicPath: "./",
  outputDir: 'erpStatic',
  assetsDir: 'erpStatic',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'erpIndex.html',
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/proxy': {
        // target: 'http://mldev.51vfang.cn/'
        // target: 'http://appverify.51vfang.cn/',  
        target: 'http://192.168.200.29:9007',
        // target: 'http://gray.51vfang.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '/'
        },
        secure: false
      }
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    externals: {
      "BMap": "BMap"
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        'vue$': 'vue/dist/vue.esm.js'    // 处理vue节点
      }
    }
  },

};