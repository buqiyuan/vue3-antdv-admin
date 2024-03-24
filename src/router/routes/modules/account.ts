import type { RouteRecordRaw } from 'vue-router';
import { t } from '@/hooks/useI18n';

const moduleName = 'account';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
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
    ],
  },
];

export default routes;
