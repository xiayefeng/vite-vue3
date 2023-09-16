import CancelAxios from './cancleRequest.js'

export default class RequestStore extends CancelAxios {
  storeInstance = null
  #map = new Map()
  constructor() {
    super()
    this.storeInstance = this
  }
  getInstance () {
    return { storeInstance: this.createStore(), cancelInstance: this.createCancel() }
  }
  hasStore (key) {
    return this.#map.has(key)
  }
  getStore (key) {
    const res = this.#map.get(key)
    return res
  }
  setStore (key, val) {
    this.#map.set(key, val)
  }
  delStore (key) {
    this.#map.delete(key)
  }
  createStore () {
    if (!this.storeInstance) {
      this.storeInstance = new RequestStore()
    }
    return this.storeInstance
  }
}