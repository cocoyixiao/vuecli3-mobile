import { isIos, isAndroid } from './_util'

export function sendMessageToApp(image, type) {
  if (isIos()) {
    const obj = { image, type }
    window.webkit.messageHandlers.sharePoster.postMessage(JSON.stringify(obj))
  }
  if (isAndroid()) {
    window.android.sharePoster(image, type)
  }
}
