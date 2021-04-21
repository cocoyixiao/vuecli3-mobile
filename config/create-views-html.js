const glob = require('glob')
const fs = require('fs')
const pug = require('pug')
const path = require('path')
const chalk = require('chalk')
const beautify = require('js-beautify').js
const resolve = dir => {
  return path.join(__dirname, dir)
}

const config = {
  pugPath: './src/html/pages/*',
  vuePath: './src/js/pages/*/*'
}

function creatHtml() {
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
    const path = resolve('../views/' + property)
    const exists = fs.existsSync(path)
    if (!exists) {
      fs.mkdirSync(path, { recursive: true }, err => {
        if (err) {
          throw new Error('creat filedir! something wrong was happended')
        }
      })
    }
    // 把html内容写入到对应目录的文件中
    fs.writeFileSync(path + '/index.html', pugStr)
  }
}

function creatMainJs() {
  const pugs = getAllPugs()
  const vues = getAllVues()
  // 生成main.js时，vue文件和pug文件都必须存在
  const pugKeys = Object.keys(pugs)
  const vueKeys = Object.keys(vues)
  if (!vueKeys.length) {
    console.log(chalk.white.bgRed.bold("No vues file, can't creat main.js!"))
    return
  }

  // 判断有没有找到相对应名字的.vue和.pug文件
  const resultArr = getArrEqual(vueKeys, pugKeys)
  if (!resultArr.length) {
    console.log(
      chalk.white.bgRed.bold(
        'Please check vue and pug, not found the same name'
      )
    )
    return
  }

  // 开始生成main.js
  resultArr.forEach(name => {
    createOrCopyMainJs(name)
  })
}

function createOrCopyMainJs(name) {
  const targetPath = resolve('../views/' + name)
  // 判断有没有目录路径
  const exists = fs.existsSync(targetPath)
  if (!exists) {
    fs.mkdirSync(targetPath, { recursive: true }, err => {
      if (err) {
        throw new Error('can not creat filedir! please check and continue')
      }
    })
  }

  const vues = getAllVues()
  const mainjsFile = path.join(
    __dirname,
    '..',
    path.dirname(vues[name]) + '/main.js'
  )
  // 判断有没有默认的main.js，有的话拷贝过去，没有就创建
  fs.access(mainjsFile, fs.constants.F_OK, err => {
    if (!err) {
      copyFile(mainjsFile, targetPath + '/main.js')
      console.log('\n')
      console.log(chalk.green.bold('copy ' + mainjsFile + ' success!'))
    } else {
      const mainJsContent = initMainjsContent(targetPath, vues[name])
      fs.writeFileSync(
        targetPath + '/main.js',
        beautify(mainJsContent, {
          indent_size: 2,
          space_in_empty_paren: true,
          end_with_newline: true
        })
      )
      console.log(chalk.green.bold('write ' + targetPath + '/main.js success!'))
    }
  })
}

function getAllPugs() {
  let pugs = {}
  // 读取pugsPath/底下所有的.pug文件
  glob.sync(config.pugPath + '.pug').forEach(function(entry) {
    const pname = entry
      .split('/')
      .splice(-1)[0]
      .split('.')[0]
    pugs[pname] = entry
  })
  return pugs
}

function getAllVues() {
  // 读取vuePath/底下所有的vue文件
  let vues = {}
  glob.sync(config.vuePath + '.vue').forEach(function(entry) {
    const pname = entry.split('/').splice(-2, 1)[0]
    vues[pname] = entry
  })
  return vues
}

// main.js模板
function initMainjsContent(targetPath, vuePath) {
  const relative = path.relative(targetPath, path.resolve(vuePath))
  return `
    import Vue from 'vue'
    Vue.config.productionTip = false

    //引入全局toast
    import toastRegistry from '@components/toast/index'
    Vue.use(toastRegistry)

    import App from  '${relative}'
    new Vue({
      render: h => h(App)
    }).$mount('#root')
  `
}

function getArrEqual(arr1, arr2) {
  let newArr = []
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j] === arr2[i]) {
        newArr.push(arr1[j])
      }
    }
  }
  return newArr
}

function copyFile(source, target) {
  fs.readFile(source, (err, data) => {
    if (err) {
      if (err) throw new Error('readfile something wrong was happended')
    }
    const targetDir = path.dirname(target)
    const exists = fs.existsSync(targetDir)
    if (!exists) {
      fs.mkdirSync(targetDir, { recursive: true }, err => {
        if (err) {
          throw new Error('creat filedir! something wrong was happended')
        }
      })
    }
    fs.writeFileSync(target, data, error => {
      if (error) {
        throw new Error('writefile something wrong was happended')
      } else {
        console.log(chalk.green.bold('copy ' + source + ' success!'))
      }
    })
  })
}

function creatTemp() {
  creatMainJs()
  creatHtml()
}
module.exports = creatTemp
