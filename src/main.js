import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from '@/router'
import './style/common.scss';
import App from './App.vue';
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(router)
  .use(createPinia)
  .mount('#app');
