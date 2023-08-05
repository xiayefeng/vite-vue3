import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from '@/router'
import './style.css';
import App from './App.vue';

const app = createApp(App)
app.use(router)
  .use(createPinia)
  .mount('#app');
