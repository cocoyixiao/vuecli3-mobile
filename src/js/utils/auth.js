import { isWeixin, queryParams, setTokenPintuan } from '@utils/_util.js'
import { getWxAccessToken } from '@api/wxauth'

// 微信授权
export default {
  /**
   * 判断环境 且 是否已经授权
   */
  authorization(params) {
    const isWX = isWeixin()
    // const isHasOpenId = getTokenPintuan('open_id')
    // 是微信环境 且没有 open_id 则开始授权
    const code = queryParams('code')
    if (isWX && !code) {
      this.weixinShouQuan(params)
    } else {
      this.getAuthorization(code)
    }
  },
  /**
   * 跳转微信授权 第一步
   */
  weixinShouQuan(params) {
    const appid = 'wx6fa6de13db63f645',
      redirectUrl = encodeURIComponent(
        'http://www.ceshidomain.com/pintuan-login.html'
      )
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=${params}#wechat_redirect`
  },
  async getAuthorization(code) {
    const { data } = await getWxAccessToken({
      code
    })
    setTokenPintuan('open_id', data)
  }
}
