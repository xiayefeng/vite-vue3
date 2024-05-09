import { createRouter, createWebHashHistory, createWebHistory, useRouter, useRoute } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('@/views/HomePage.vue') },
    { path: '/img', component: () => import('@/views/LazyImg.vue') },
    {path: '/preloadImg', component: () => import('@/views/PreloadImg.vue')}
    //...
  ],
})

console.log(createWebHistory.name)

router.beforeEach(() => {
  // console.log(to)
  // console.log(from)
  // ...
  // 返回 false 以取消导航
  // return true
})

export const $router = useRouter()
export const $route = useRoute()

export default router