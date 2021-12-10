import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'http://buqiyuan.gitee.io/vite-vue3-lowcode/',
    name: 'http://buqiyuan.gitee.io/vite-vue3-lowcode/',
    component: RouterTransition,
    meta: {
      title: 'H5低代码平台',
      icon: 'icon-externa-link',
    },
  },
];

export default routes;
