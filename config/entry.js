let glob = require('glob')
function getEntry(globPath) {
  let entries = {},
    tmp,
    htmls = {}
  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + 'html').forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    htmls[tmp[1]] = entry
  })
  // 读取src/pages/**/底下所有的js文件
  glob.sync(globPath + 'js').forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    if (tmp[2] !== 'main.js') return
    entries[tmp[1]] = {
      entry,
      //  当前目录没有有html则以共用的public/index.html作为模板
      template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html',
      //  以文件夹名称.html作为访问地址
      filename: tmp[1] + '.html',
      chunks: ['chunk-vendors', 'chunk-common', tmp[1]]
    }
  })
  return entries
}

module.exports = getEntry
