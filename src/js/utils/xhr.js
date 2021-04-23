import axiosInit from './axios-config'
import { queryParams, getTokenPintuan } from '@utils/_util'
const headersToken = {
  Authorization: queryParams('token') || getTokenPintuan('token')
}

let instance = axiosInit()
export default {
  get(url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    } else {
      options.headers = headersToken
    }
    return instance.get(url, options)
  },
  post(url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    } else {
      options.headers = headersToken
    }
    return instance.post(url, params, options)
  },
  put(url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    } else {
      options.headers = headersToken
    }
    return instance.put(url, params, options)
  },
  delete(url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.delete(url, options)
  },
  apiurl(url) {
    return `/feRest${url}`
  }
}
