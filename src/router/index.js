import { createRouter, createWebHashHistory, createWebHistory, useRouter, useRoute } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})

console.log(createWebHistory)

router.beforeEach((to, from) => {
  console.log(to)
  console.log(from)
  // ...
  // 返回 false 以取消导航
  return false
})

export const $router = useRouter()
export const $route = useRoute()

export default router