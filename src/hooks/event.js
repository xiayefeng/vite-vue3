import { ref, onMounted, onUnmounted } from 'vue'

export function useEventListener (target, event, callback) {
  let el = null
  if (typeof target === 'object' && target && ([Node.DOCUMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE, Node.ELEMENT_NODE].includes(target.nodeType) || self === target)) {
    el = target
  } else if (typeof target === 'string' && target) {
    el = document.querySelector(target)
    if (!el) {
      console.warn('找不到对元素,请检查 target 参数')
      return
    }
  } else {
    console.warn('target 参数错误')
    return
  }
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

export function useMouse () {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}