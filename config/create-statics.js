const glob = require('glob')
const fs = require('fs')
const pug = require('pug')
const path = require('path')
const chalk = require('chalk')

const pugStatic = './src/html/common/*.pug'

function createAllStatics() {
  const pugs = getAllPugs()
  // 生成html
  if (!Object.keys(pugs).length) {
    console.log(chalk.white.bgRed.bold('Not found pug path files!'))
    return
  }
  // 将pug模板文件生成为vue需要的html模板文件
  for (let property in pugs) {
    // 读取pug模板内容
    const pugStr = pug.renderFile(pugs[property], { pretty: true }) //pretty : ture 相当于beauty格式化一下输出的代码
    const publicPath = path.join(__dirname, '..', '/public')
    const exists = fs.existsSync(path)
    if (!exists) {
      fs.mkdirSync(publicPath, { recursive: true }, err => {
        if (err) {
          throw new Error('creat filedir! something wrong was happended')
        }
      })
    }
    // 把html内容写入到public的文件夹里
    fs.writeFileSync(publicPath + '/' + property + '.html', pugStr)
    console.log(
      chalk.green.bold(
        'write ' + publicPath + '/' + property + '.html success!'
      )
    )
  }
}

function getAllPugs() {
  let pugs = {}
  // 读取pugsPath/底下所有的.pug文件
  const pugPath = path.join(__dirname, '..', pugStatic)
  glob.sync(pugPath).forEach(function(entry) {
    const pname = entry
      .split('/')
      .splice(-1)[0]
      .split('.')[0]
    pugs[pname] = entry
  })
  return pugs
}

module.exports = createAllStatics
