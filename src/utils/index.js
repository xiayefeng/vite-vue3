import asyncPool from 'tiny-async-pool'

export function copyText (txt) {
  if (txt == null || txt === '') {
    return
  }
  if (window.isSecureContext && window.navigator.clipboard) {
    window.navigator.clipboard.writeText(txt).then(() => {
      console.log('copy success')
    }).catch(err => {
      console.log(err)
    })
  } else {
    // 动态创建 textarea 标签
    const textarea = document.createElement('textarea')
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
    textarea.readonly = 'readonly'
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    // 将要 copy 的值赋给 textarea 标签的 value 属性
    textarea.value = txt
    // 将 textarea 插入到 body 中
    document.body.appendChild(textarea)
    // 选中值并复制
    textarea.select()
    const result = document.execCommand('copy')
    if (result) {
      console.log('copy success')
    }
    document.body.removeChild(textarea)
  }
}

export function isPromise (val) {
  return val && typeof val.then === 'function' && typeof val.catch === 'function'
}

export const renderData = (data, total, page, pageCount, showData) => {
  // base case -- total 为 0 时没有数据要渲染 不再递归调用
  if (total <= 0) return

  // total 比 pageCount 少时只渲染 total 条数据
  pageCount = Math.min(pageCount, total)

  requestAnimationFrame(() => {
    const startIdx = page * pageCount
    const endIdx = startIdx + pageCount
    const dataList = data.slice(startIdx, endIdx)
    showData.push(...dataList)

    renderData(data, total - pageCount, page + 1, pageCount, showData)
  })
}

export function compose (...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function getImg (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

export function preloadImg (list, limit = 4) {
  window.requestIdleCallback(async () => {
    for await (const item of asyncPool(limit, list, getImg)) {
      console.log(item)
    }
  }, { timeout: 4000 })
}

export function paramsToUrl (url, params = {}) {
  const searchParams = new URLSearchParams(params)
  return `${url}?${searchParams.toString()}`
}

export function getStoreKey (url, params, rest) {
  let fullUrl = ''
  if (rest.ignoreParams) {
    fullUrl = url
  } else {
    fullUrl = paramsToUrl(url, params)
  }
  return fullUrl
}

export function getImgSize(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({
      width: img.width,
      height: img.height
    })
    img.onerror = () => resolve({
      width: 0,
      height: 0
    })
    img.src = url
  })
}


// renderData(res.data, res.data.length, 0, 200, showData)