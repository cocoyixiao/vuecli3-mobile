import xhr from '../utils/xhr'

// 获取验证码
export function getCode(params) {
  return xhr.get(xhr.apiurl('/api/v1/sec/captcha/register'), params)
}

// 验证码登录
export function registerNoPwd(params) {
  return xhr.post(xhr.apiurl('/api/v1/sec/registerNoPwd'), params)
}
