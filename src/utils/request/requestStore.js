import CancelAxios from './cancleRequest.js'

export default class RequestStore extends CancelAxios {
  #map = new Map()
  /*   constructor() {
      super()
    } */
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
}