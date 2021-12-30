import 'nprogress/css/nprogress.css'; // 进度条样式
import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { createRouterGuards } from './router-guards';

import common from '@/router/staticModules';
import shared from './staticModules/besidesLayout';
import { notFound, errorRoutes } from './staticModules/error';
import { whiteNameList } from './constant';

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
  notFound,
  errorRoutes,
];

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export async function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router, whiteNameList);
  // 路由准备就绪后挂载APP实例
  await router.isReady();
}
export default router;
