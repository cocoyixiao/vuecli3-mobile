let glob = require('glob')
const path = require('path')
function getEntry(globPath) {
  let entries = {},
    tmp,
    htmls = {},
    filenames = {}
  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + 'html').forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    htmls[tmp[1]] = entry
    filenames[tmp[1]] = path.relative('./views/', entry)
  })
  // 读取src/pages/**/底下所有的js文件
  glob.sync(globPath + 'js').forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    console.log(tmp)
    if (tmp[2] !== 'main.js') return
    entries[tmp[1]] = {
      entry,
      //  当前目录没有有html则以共用的public/index.html作为模板
      template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html',
      //  以文件夹名称.html作为访问地址
      filename: filenames[tmp[1]],
      chunks: ['chunk-vendors', 'chunk-common', tmp[1]]
    }
  })
  return entries
}

module.exports = getEntry
