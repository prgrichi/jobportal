import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import './main.css';
import { useAuthStore } from '@/stores/auth/auth';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();
authStore.init();

app.use(router);
app.mount('#app');