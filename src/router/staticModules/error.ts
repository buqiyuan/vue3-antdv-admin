import { type RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_NAME } from '@/router/constant';
import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'error';

export const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/error/404',
  component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue'),
};

export const errorRoute: RouteRecordRaw = {
  path: '/error',
  name: moduleName,
  redirect: '/error/404',
  component: RouterView,
  meta: {
    title: '错误页',
    icon: 'EditOutlined',
    hideInMenu: true,
    hideInTabs: true,
  },
  children: [
    {
      path: '404',
      name: PAGE_NOT_FOUND_NAME,
      meta: {
        title: '404',
        icon: 'UserOutlined',
        hideInMenu: true,
      },
      component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue'),
    },
  ],
};

export default [errorRoute, notFound];
