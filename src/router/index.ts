import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { createRouterGuards } from './router-guards';
import 'nprogress/css/nprogress.css'; // 进度条样式

import shared from './staticModules/shared';
import { errorRoutes } from './staticModules/error';
import common from '@/router/staticModules';
import { App } from 'vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: {
      title: '首页',
    },
    children: [...common],
  },
  ...shared,
  errorRoutes,
];

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});

export async function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
  // 路由准备就绪后挂载APP实例
  await router.isReady();
}
export default router;
