import 'nprogress/css/nprogress.css'; // 进度条样式
import { type App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { createRouterGuards } from './router-guards';

import staticModules from './staticModules/';
import outsideLayout from './outsideLayout';
import { whiteNameList } from './constant';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard/welcome',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: {
      title: '首页',
    },
    children: [...staticModules],
  },
  // Layout之外的路由
  ...outsideLayout,
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
  // 创建路由守卫
  createRouterGuards(router, whiteNameList);

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}
export default router;
