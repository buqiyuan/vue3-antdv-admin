import type { RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'https://buqiyuan.gitee.io/vite-vue3-lowcode/',
    name: 'https://buqiyuan.gitee.io/vite-vue3-lowcode/',
    component: RouterView,
    meta: {
      title: 'H5低代码平台',
      icon: 'ant-design:link-outlined',
      isExt: true,
    },
  },
];

export default routes;
