import { createApp } from 'vue';
import { router } from './router.ts';
import App from './App.vue';
import './style.css';
// Import library CSS - Vite plugin wraps it in a layer to prevent conflicts
// import 'vue-wswg-editor/style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
