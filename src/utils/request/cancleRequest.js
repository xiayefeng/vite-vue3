export default class CancelAxios {
  #map = new Map()
  removePendingReq (url, type) {
    const item = this.#map.get(url)
    if (item) {
      this.#map.delete(url)
      type === 'req' && item.abort()
    }
  }
  addRequest (url, config) {
    const controller = new AbortController()
    config.signal = controller.signal
    this.#map.set(url, controller)
  }
  clear () {
    this.#map.clear()
  }
}