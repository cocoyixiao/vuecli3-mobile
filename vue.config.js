const path = require('path')

const isDev = process.env.NODE_ENV == 'development'
const resolve = dir => {
  return path.join(__dirname, dir)
}
const cdnPath = '//cdnbaidu.com/'

module.exports = {
  publicPath: isDev ? '/' : cdnPath, // 这个地方就是你的cdn的地址
  chainWebpack: config => {
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
        publicPath: (url, resourcePath, context) =>
          handleImgDir(url, resourcePath, context, true),
        outputPath: handleImgDir,
        name: isDev ? '/[name].[ext]' : '/[name]-[hash:8].[ext]'
      })
      .end()

    config.resolve.alias
      // key,value自行定义，比如.set('@assets', resolve('src/assets'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@css', resolve('src/assets/stylus'))
      .set('@images', resolve('src/assets/images'))
    // 处理全局stylus
    globalStylusRule(config)
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
      '/shopRest/*': {
        target: 'http://127.0.0.1:9090', // 接口域名
        ws: true,
        pathRewrite: {
          '^/shopRest': ''
        },
        changeOrigin: true // 是否跨域
      }
    },
    openPage: './'
  }
}

function globalStylusRule(config) {
  const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  types.forEach(type => {
    const rule = config.module.rule('stylus').oneOf(type)
    rule
      .use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/assets/stylus/global/base.styl')
        ]
      })
  })
}

// 图片相对路径获取，正式环境加上cdn的绝对路径
function handleImgDir(url, resourcePath, context, isPublicDir = false) {
  const relativePath = path.relative(context, resourcePath)
  let furl = path.dirname(relativePath).replace('src/assets/', '')
  if (!isDev && isPublicDir) furl = cdnPath + furl
  return `${furl}${url}`
}
