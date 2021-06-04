const glob = require('glob')
const fs = require('fs')
const pug = require('pug')
const path = require('path')
const chalk = require('chalk')
const beautify = require('js-beautify').js
const createStatic = require('./create-statics')
const isDev = process.env.NODE_ENV === 'development'
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
  return new Promise((success, fail) => {
    if (!Object.keys(pugs).length) {
      fail('Not found pug path files!')
    } else {
      // 将pug模板文件生成为vue需要的html模板文件
      let list = []
      for (let property in pugs) {
        list.push(handleHtml(property))
        // 读取pug模板内容
      }
      Promise.all(list)
        .then(res => {
          console.log('\n')
          success(res)
        })
        .catch(err => {
          fail(err)
        })
    }
  })
}
function handleHtml(key) {
  return new Promise((resolved, reject) => {
    const pugs = getAllPugs()
    //pretty : ture 相当于beauty格式化一下输出的代码
    let htmlStr = pug.renderFile(pugs[key], { pretty: true })
    if (!isDev) {
      htmlStr = replaceJsPath(htmlStr)
    }
    const viewsPath = resolve('../views/' + key)
    const exists = fs.existsSync(viewsPath)
    if (!exists) {
      fs.mkdirSync(viewsPath, { recursive: true }, err => {
        if (err) {
          reject('creat filedir! something wrong was happended')
        }
      })
    }
    // 把html内容写入到对应目录的文件中
    fs.writeFileSync(viewsPath + '/index.html', htmlStr)
    const obj = {
      name: key,
      path: path.relative(__dirname, viewsPath + '/index.html')
    }
    resolved(obj)
  })
}

function replaceJsPath(str) {
  const scriptReg = /<script(.*?)src="(.*?)">/gi
  const temp = str.replace(scriptReg, (re, $1, $2) => {
    return re.replace($2, '//testcdn.xxx.cn' + $2)
  })
  return temp
}

function creatMainJs() {
  // 生成main.js时，vue文件和pug文件都必须存在
  const pugKeys = Object.keys(getAllPugs())
  const vueKeys = Object.keys(getAllVues())
  return new Promise((resolved, reject) => {
    // 判断有没有找到相对应名字的.vue和.pug文件
    const resultArr = getArrEqual(vueKeys, pugKeys)
    if (!resultArr.length) {
      reject('Please check vue and pug, not found the same name')
    }
    if (!vueKeys.length) {
      reject("No vues file, can't creat main.js!")
    }

    // 将pug模板文件生成为vue需要的html模板文件
    let list = []
    resultArr.forEach(key => {
      // 开始生成main.js
      list.push(createOrCopyMainJs(key))
    })
    Promise.all(list)
      .then(res => {
        resolved(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function createOrCopyMainJs(name) {
  return new Promise((resolved, reject) => {
    const targetPath = resolve('../views/' + name)
    // 判断有没有目录路径
    const exists = fs.existsSync(targetPath)
    if (!exists) {
      fs.mkdirSync(targetPath, { recursive: true }, err => {
        if (err) {
          reject('can not creat filedir! please check and continue')
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
      const finalPath = targetPath + '/main.js'
      if (!err) {
        copyFile(mainjsFile, finalPath)
          .then(res => {
            const obj = {
              name: name,
              path: res
            }
            resolved(obj)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        const mainJsContent = initMainjsContent(targetPath, vues[name])
        fs.writeFileSync(
          finalPath,
          beautify(mainJsContent, {
            indent_size: 2,
            space_in_empty_paren: true,
            end_with_newline: true
          })
        )
        const mainPath = path.relative(__dirname, finalPath)
        const obj = {
          name: name,
          path: mainPath
        }
        resolved(obj)
      }
    })
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
  return new Promise((resolved, reject) => {
    fs.readFile(source, (err, data) => {
      if (err) {
        reject('readfile something wrong was happended')
      }
      const targetDir = path.dirname(target)
      const exists = fs.existsSync(targetDir)
      if (!exists) {
        fs.mkdirSync(targetDir, { recursive: true }, err => {
          if (err) {
            reject('creat filedir! something wrong was happended')
          }
        })
      }
      fs.writeFileSync(target, data)
      resolved(path.relative(__dirname, target))
    })
  })
}

function afterCreateAll() {
  createStatic()
  Promise.all([creatHtml(), creatMainJs()])
    .then(res => {
      console.log(chalk.green.bold(JSON.stringify(res)))
    })
    .catch(err => {
      console.log(chalk.white.bgRed(err))
    })
}

afterCreateAll()
