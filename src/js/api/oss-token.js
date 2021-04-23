import xhr from '../utils/xhr'

// oss获取token
export function imgSign(params) {
  return xhr.get(xhr.apiurl('/api/v1/vod/createUploadImg'), params)
}
