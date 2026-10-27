import type { Router } from 'vue-router';

let currentRouter: Router | undefined;

/** 路由实例由 `instance.ts` 创建后注入，避免路由表反向引用实例。 */
export function bindRouter(router: Router) {
  currentRouter = router;
}

export function getRouter(): Router {
  if (!currentRouter) {
    throw new Error('Router has not been created');
  }
  return currentRouter;
}
