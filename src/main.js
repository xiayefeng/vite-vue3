import { createApp } from 'vue';
import router from '@/router'
import store from '@/store'
import '@/style/common.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app');
