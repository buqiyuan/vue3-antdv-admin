import { type RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'http://buqiyuan.gitee.io/vite-vue3-lowcode/',
    name: 'http://buqiyuan.gitee.io/vite-vue3-lowcode/',
    component: RouterView,
    meta: {
      title: 'H5低代码平台',
      icon: 'icon-externa-link',
    },
  },
];

export default routes;
