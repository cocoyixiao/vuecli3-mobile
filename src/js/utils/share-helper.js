/* eslint-disable */
import { getWechatConfig } from '@api/_wxconfig'

const jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
const isDebugger = location.href.indexOf('debugger') > -1 //通过url注入调试模式是否开启

export default function wxshare(shareConfig) {
  let currentUrl = location.href.split('#')[0]
  getWechatConfig({ url: currentUrl })
    .then(res => {
      const data = res.data //返回wx.config需要的参数
      wx.config({
        debug: isDebugger, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function() {
        wx.onMenuShareTimeline(shareConfig)
        wx.onMenuShareAppMessage(shareConfig)
      })
      wx.error(function(res) {
        console.log(res)
      })
    })
    .catch(function(error) {
      // eslint-disable-next-line no-undef
      reject(error)
    })
}
