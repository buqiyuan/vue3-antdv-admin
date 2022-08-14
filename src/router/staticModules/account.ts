import type { RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';
import { t } from '@/hooks/useI18n';

const moduleName = 'account';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    component: RouterView,
    redirect: '/account/settings',
    meta: {
      title: '个人中心',
      hideInMenu: true,
    },
    children: [
      {
        path: 'settings',
        name: `${moduleName}-settings`,
        component: () => import('@/views/account/settings.vue'),
        meta: { title: t('routes.account.settings'), hideInMenu: true },
      },
      {
        path: 'about',
        name: `${moduleName}-about`,
        component: () => import('@/views/account/about.vue'),
        meta: { title: t('routes.account.about'), hideInMenu: true },
      },
    ],
  },
];

export default routes;
