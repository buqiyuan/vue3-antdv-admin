import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'error';

export const notFound = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/error/404',
  component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue'),
};

export const errorRoutes = {
  path: '/error',
  name: moduleName,
  redirect: '/error/404',
  component: RouterView,
  meta: {
    title: '错误页',
    icon: 'EditOutlined',
    hideInMenu: true,
  },
  children: [
    {
      path: '404',
      name: `${moduleName}-404`,
      meta: {
        title: '404',
        icon: 'UserOutlined',
      },
      component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue'),
    },
  ],
};

export default [notFound, errorRoutes];
