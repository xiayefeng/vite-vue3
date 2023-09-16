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
      console.log('复制成功')
    }
    document.body.removeChild(textarea)
  }
}

export function isPromise (val) {
  return val && typeof val.then === 'function' && typeof val.catch === 'function'
}