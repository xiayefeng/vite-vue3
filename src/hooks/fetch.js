import { ref } from 'vue'
import request from '@/utils/request.js'

export function useFetch ({ url, method = 'get', params = {}, data = {}, ...rest }) {
  const result = ref(null)
  const error = ref(null)

  request({ url, method, params, data, ...rest })
    .then((res) => (result.value = res.data))
    .catch((err) => (error.value = err))

  return { data: result, error }
}