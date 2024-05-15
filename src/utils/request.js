import axios from 'axios'
import qs from 'qs'
import requestStore from '@/utils/request/requestStore.js'
import { isPromise } from '@/utils'

const instance = axios.create({
  timeout: 1000
})

const toolsInstance = new requestStore()
instance.interceptors.request.use(
  config => {
    const url = config.url
    if (config.signalRequest) {
      // removePendingReq(url, 'req')
      toolsInstance.removePendingReq(url, 'req')
      // const controller = new AbortController()
      // config.signal = controller.signal
      // reqMap.set(url, controller)
      toolsInstance.addRequest(url, config)
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
      /* let formData = new FormData()
      for (let i in config.data) {
        formData.append(i, config.data[i])
      } */
      // config.data = formData
    } else if (config.data) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  resp => {
    const res = resp.data
    const url = resp.config.url
    /* if (resp.config.method === 'get') {
      url += '?' + qs.stringify(resp.config.params)
    } */
    if (resp.config.signalRequest) {
      // removePendingReq(url, 'resp')
      toolsInstance.removePendingReq(url, 'resp')
    }

    if (res.code === 0) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    if (error.message.includes('Network')) {
      error.message = '网络不给力，请稍后再试'
    } else if (error.message.includes('timeout')) {
      error.message = '请求超时，请稍后重试'
    } else if (axios.isCancel(error)) {
      error.message = '请求已取消'
    } else if (typeof error.code === 'undefined') {
      error.message = '连接出错，请重试'
    }
    return Promise.reject(error)
  }
)

export default ({ url, method = 'get', params = {}, data = {}, ...rest } = {}) => {
  // console.log(url)
  // console.log(params)
  if (!url) {
    console.warn('请求地址不能为空')
    return
  }
  if (/[A-Z]/.test(method)) {
    method = method.toLocaleLowerCase()
  }
  if (rest.useMemo && method === 'get') {
    if (toolsInstance.hasStore(url)) {
      const res = toolsInstance.getStore(url)
      if (isPromise(res)) {
        return res
      } else {
        return Promise.resolve(res)
      }
    }
  }
  const p = instance.request({
    url,
    params,
    data,
    method,
    ...rest
  }).then((res) => {
    if (rest.useMemo && method === 'get') {
      toolsInstance.setStore(url, res)
    }
    return res
  }).catch(error => {
    if (rest.useMemo && method === 'get') {
      toolsInstance.delStore(url)
    }
    // console.log(error)
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
    }
    return error
  })

  if (rest.useMemo && method === 'get') {
    if (!toolsInstance.hasStore(url)) {
      toolsInstance.setStore(url, p)
    }
  }
  return p
}