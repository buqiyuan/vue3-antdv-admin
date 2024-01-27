import outsideLayout from './outsideLayout';
import basic from './basic';
import type { RouteRecordRaw } from 'vue-router';

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  redirect: '/dashboard/welcome',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '根路由',
  },
  children: [],
};

export const basicRoutes: Array<RouteRecordRaw> = [
  rootRoute,
  // Layout之外的路由
  ...outsideLayout,
  // 基础路由
  ...basic,
];
