import { defineStore, createPinia } from 'pinia'

const store = createPinia()

export const useAppStore = defineStore('app', {
  // 其他配置...
  state: () => ({
    count: 0,
    users: []
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    }
  },
  actions: {
    increment () {
      this.count++
    },
    randomizeCounter () {
      this.count = Math.round(100 * Math.random())
    }
  }
})

export default store