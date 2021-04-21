/**
 * 判断当前设备是否是移动端
 * @returns {boolean}
 */
export function isMobile() {
  const u = navigator.userAgent,
    mobile = !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone = u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad = u.indexOf('iPad') > -1 //是否iPad

  return mobile || ios || android || iPhone || iPad
}

/**
 * 判断是否是微信浏览器
 * @returns {boolean}
 */
export function isWechat() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}
