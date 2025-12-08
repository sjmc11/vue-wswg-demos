import { createApp } from "vue";
import { router } from "./router.ts";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createHead } from "@vueuse/head";

import "./style.css";

const app = createApp(App);
const pinia = createPinia();
const head = createHead();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(head);
app.use(router);
app.mount("#app");
