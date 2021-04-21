const path = require('path')
const isDev = process.env.NODE_ENV == 'development'
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 配置上传oss的地址前缀
const cdnPath = '//ceshidomain.com/static/'
// 配置pages多页面获取当前文件夹下的html和js
require('./config/create-views-html.js')()
// 静态文件转移到public文件夹下
require('./config/create-static-html.js')()
const getEntry = require('./config/entry.js')
const pages = getEntry('./views/**/*.')

const cdn = {
  css: [],
  js: [
    'http://ceshidomain.com/static/js/lib/axios.0.20.0-0.min.js',
    'http://ceshidomain.com/static/js/lib/vue.2.6.11.min.js'
  ]
}

const externals = {
  vue: 'Vue',
  axios: 'axios'
}

console.log(pages)
module.exports = {
  pages,
  publicPath: isDev ? '/' : '/',
  chainWebpack: config => {
    // 外部文件引入
    if (!isDev) {
      config.externals(externals)
      // 生产环境注入cdn
      const entry = Object.keys(pages)
      for (const iterator of entry) {
        config.plugin(`html-${iterator}`).tap(args => {
          args[0].cdn = cdn
          return args
        })
      }
    }

    config.resolve.symlinks(true)
    // 采用pug格式写html
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
    // 处理样式或pug文件中的图片路径
    config.module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10,
        // 根据环境使用cdn或相对路径
        publicPath: isDev ? 'images' : cdnPath + 'images',
        outputPath: 'images',
        name: isDev ? '[name].[ext]' : '[name]-[hash:8].[ext]'
      })
      .end()

    config.resolve.alias
      // key,value自行定义，比如.set('@assets', resolve('src/assets'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/js/components'))
      .set('@css', resolve('src/assets/stylus'))
      .set('@images', resolve('src/assets/images'))
      .set('@api', resolve('src/js/api'))
      .set('@utils', resolve('src/js/utils'))
      .set('@lib', resolve('src/js/lib'))
      .set('@pages', resolve('src/js/pages'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    overlay: true,
    open: true,
    proxy: {
      '/feRest': {
        target: 'http://test-api.ceshidomain.com/', // 接口域名
        ws: true,
        pathRewrite: {
          '^/feRest': ''
        },
        changeOrigin: true // 是否跨域
      }
    },
    public: 'localhost:8080' // 本地ip
  }
}
