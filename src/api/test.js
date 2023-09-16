import request from '@/utils/request.js'

export function getInfo (url, params) {
  return request({ url, params, useMemo: 1 })
}