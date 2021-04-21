import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
/*
 * 设置setLocalStorage
 * */
export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, window.JSON.stringify(value))
}
/*
 * 获取getLocalStorage
 * */
export function getLocalStorage(key) {
  return window.JSON.parse(window.localStorage.getItem(key) || '[]')
}
/*
 * 设置setSessionStorage
 * */
export function setSessionStorage(key, value) {
  window.sessionStorage.setItem(key, window.JSON.stringify(value))
}
/*
 * 获取getSessionStorage
 * */
export function getSessionStorage(key) {
  return window.JSON.parse(window.sessionStorage.getItem(key) || '[]')
}
/*
 * 获取getToken
 * */
export function getToken() {
  return Cookies.get(TokenKey)
}
/*
 * 设置setToken
 * */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
/*
 * 移除removeToken
 * */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 拼团cookies
 */

export function setTokenPintuan(key, value) {
  Cookies.set(key, value)
}

export function getTokenPintuan(key) {
  return Cookies.get(key)
}

export function removeTokenPintuan(key) {
  return Cookies.remove(key)
}

/**
 * [通过参数名获取url中的参数值]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param  {[string]} queryName [参数名]
 * @return {[string]}           [参数值]
 */
export function queryParams(queryName) {
  var query = decodeURI(window.location.search.substring(1))
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == queryName) {
      return pair[1]
    }
  }
  return null
}
/**
 * 用于获取滚动元素
 * @param { Undefined }
 * @return { DOM }
 */
export function bodyOrHtml() {
  if ('scrollingElement' in document) {
    return document.scrollingElement
  }
  if (navigator.userAgent.indexOf('WebKit') != -1) {
    return document.body
  }
  return document.documentElement
}

// 获取滚动条在Y轴上的滚动距离
export function getScrollTop() {
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
  return scrollTop
}

// 获取文档的总高度
export function getScrollHeight() {
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight
  return scrollHeight
}

// 浏览器视口的高度
export function getWindowHeight() {
  var windowHeight = 0
  if (document.compatMode == 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

// 获取滚动条到底部的距离
export function scrollBottomSize() {
  return getScrollHeight() - getScrollTop() - getWindowHeight()
}

// 冻结对象
export function deepFreeze(obj) {
  var propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(function(name) {
    var prop = obj[name]
    if (typeof prop == 'object' && prop !== null) {
      deepFreeze(prop)
    }
  })
  return Object.freeze(obj)
}

// 判断是否是ios
export function isIos() {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

// 判断是否是android
export function isAndroid() {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
}

// 对比两个对象的值是否完全相等 返回值 true/false
export function isObjectValueEqual(a, b) {
  if (!a || !b) return false
  //取对象a和b的属性名
  var aProps = Object.keys(a) //返回指定对象所有自身属性名
  var bProps = Object.keys(b)

  //判断属性名的length是否一致
  if (aProps.length != bProps.length) {
    return false
  }
  //循环取出属性名，再判断属性值是否一致
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}

// 生成图片随机名字
export function guid() {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export function getBlob(canvas) {
  //获取blob对象
  var data = canvas.toDataURL('image/jpeg', 1)
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], {
    name: guid(),
    type: 'image/jpeg'
  })
}

// 生成随机数
export function randomNum(Min, Max) {
  const Range = Max - Min
  const Rand = Math.random()
  return Min + Math.round(Rand * Range)
}

/*
 * 判断是否在微信环境
 */
export function isWeixin() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
