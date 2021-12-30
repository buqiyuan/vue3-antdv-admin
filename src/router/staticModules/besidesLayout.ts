import { type RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';

/**
 * 不需要展示在Layout里面的静态路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/shared/login/index.vue'),
  },
  {
    path: '/redirect/:path*',
    name: 'Redirect',
    component: RouterView,
    meta: {
      title: '重定向',
      icon: 'SettingOutlined',
      hideInMenu: true,
    },
    children: [
      {
        path: '',
        name: 'Redirect',
        component: () => import('@/views/shared/redirect/index.vue'),
        meta: {
          title: '重定向',
          hideInMenu: true,
          keepAlive: false,
        },
      },
    ],
  },
];

export default routes;
