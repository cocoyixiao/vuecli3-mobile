const path = require('path')
const glob = require('glob')
const fs = require('fs')
const publicPath = path.join(__dirname, '..', '/public')
glob.sync(publicPath + '/*.html').forEach(file => {
  if (file.indexOf('index') < 0) {
    try {
      /**
       * @des 判断文件或文件夹是否存在
       */
      if (fs.existsSync(file)) {
        fs.unlinkSync(file)
        console.log('过度使用的页面' + file + '删除成功')
      } else {
        console.log('inexistence path：', file)
      }
    } catch (error) {
      console.log('del error', error)
    }
  }
})
