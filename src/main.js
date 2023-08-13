import { createApp } from 'vue';
import router from '@/router'
import store from '@/store'
import '@/style/common.scss';
import App from './App.vue';
import 'virtual:svg-icons-register'


const app = createApp(App)
app.use(router)
  .use(store)
  .mount('#app');
