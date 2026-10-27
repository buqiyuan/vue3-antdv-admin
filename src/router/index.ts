import type { App } from 'vue';
import { whiteNameList } from './constant';
import { router } from './instance';
import { resetRouter } from './reset';
import { createRouterGuards } from './router-guards';

export { resetRouter, router };

export async function setupRouter(app: App) {
  createRouterGuards(router, whiteNameList);
  app.use(router);
  await router.isReady();
}

export default router;
