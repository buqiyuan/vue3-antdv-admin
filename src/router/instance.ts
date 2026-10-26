import { createRouter, createWebHashHistory } from 'vue-router';
import { bindRouter } from './navigation';
import { basicRoutes } from './routes';

export const router = createRouter({
  history: createWebHashHistory(''),
  routes: basicRoutes,
});

bindRouter(router);

export default router;
