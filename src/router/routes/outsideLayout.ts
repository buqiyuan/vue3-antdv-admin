import type { RouteRecordRaw } from 'vue-router';
import { LOGIN_NAME } from '@/router/constant';

/**
 * layout布局之外的路由
 */
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_NAME,
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export default [LoginRoute];
