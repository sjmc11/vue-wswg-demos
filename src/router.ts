import { createMemoryHistory, createRouter } from 'vue-router';

import EditorView from './views/Editor.vue';
import PageView from './views/Page.vue';

const routes = [
  { path: '/', component: EditorView },
  { path: '/page', component: PageView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
