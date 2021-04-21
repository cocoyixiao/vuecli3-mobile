var co = require('co')
var OSS = require('ali-oss') //阿里云oss模块
var fs = require('fs') //文件模块
var path = require('path')
var colors = require('colors')
//---------------------------使用说明----------------------------
//获取命令行传入参数(第0个参数是node 第1个参数是js文件 第2个文件是本地文件夹路径 第3个是oss相对目录)
//命令格式举例： node  oss/upload_oss.js  ../../static/  /static/
var localPath = './dist/'
var remotePath = '/static/'
console.log(colors.green.bold('【Step1】静态文件上传准备'))
if (localPath == null || remotePath == null) {
  throw new Error('缺少目录参数！')
}
localPath = path.resolve(localPath) //本地目录
remotePath = path.resolve(remotePath) //OSS相对目录
if (!fs.existsSync(localPath)) {
  throw new Error('本地目录' + localPath + '不存在！')
}
//上传列表
var fileDic = new Array()
//阿里云OSS配置
var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'xxx',
  accessKeySecret: 'xxx',
  bucket: 'dir'
})

readDir(localPath)
function readDir(filePath) {
  filePath = path.resolve(filePath)
  //遍历文件目录
  var pa = fs.readdirSync(filePath)
  pa.forEach(function(filename) {
    const exceptArr = ['.DS_Store', '.gitkeep', 'favicon.ico', 'index.html']
    if (exceptArr.indexOf(filename) > -1) return
    if (filename.indexOf('.html') > -1) return
    var file = path.join(filePath, filename)
    var info = fs.statSync(file)
    //目录
    if (info.isDirectory()) {
      readDir(file)
    }
    //文件
    else {
      var localDir = path.join(filePath, filename)
      var remoteDir = path.join(remotePath, localDir.replace(localPath, ''))
      fileDic[localDir] = remoteDir
      // console.log(fileDic[localDir].green, '=>\n  ', remoteDir.yellow)
    }
  })
}
console.log('【Step2】 添加到上传文件列表，准备上传'.green.bold)
// console.log(fileDic)
// 开始上传
uploadToOss()
//上传方法
function uploadToOss() {
  co(function*() {
    for (var localDir in fileDic) {
      const result = yield client.put(fileDic[localDir], localDir)
      console.log(result['name'].green, '=>\n  ', result['url'].yellow)
    }
    console.log('【Step3】 全部上传完成'.green.bold)
  }).catch(function(err) {
    throw new Error(err)
  })
}
