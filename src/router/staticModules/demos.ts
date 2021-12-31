import { type RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'demos';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: moduleName,
    redirect: { name: `${moduleName}-custom-modal` },
    component: RouterView,
    meta: {
      title: 'demo演示',
      icon: 'icon-zhuomian',
    },
    children: [
      {
        path: 'custom-a-custom-modal',
        name: `${moduleName}-custom-modal`,
        meta: {
          title: '自定义模态框',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "demos-custom-a-custom-modal" */ '@/views/shared/demos/custom-modal.vue'
          ),
      },
      {
        path: 'button',
        name: `${moduleName}-button`,
        meta: {
          title: '按钮的扩展',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/shared/demos/button.vue'),
      },
      {
        path: 'form',
        name: `${moduleName}-form`,
        meta: {
          title: '表单演示',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        redirect: { name: `${moduleName}-form-basic` },
        component: RouterView,
        children: [
          {
            path: 'basic',
            name: `${moduleName}-form-basic`,
            meta: {
              title: '基本表单',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "basic-form" */ '@/views/shared/demos/form/basic-form/index.vue'
              ),
          },
          {
            path: 'rule',
            name: `${moduleName}-form-rule`,
            meta: {
              title: '验证表单',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "rule-form" */ '@/views/shared/demos/form/rule-form/index.vue'
              ),
          },
        ],
      },
      {
        path: 'table',
        name: `${moduleName}-table`,
        meta: {
          title: '表格演示',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        redirect: { name: `${moduleName}-table-wzry` },
        component: RouterView,
        children: [
          {
            path: 'wzry',
            name: `${moduleName}-table-wzry`,
            meta: {
              title: '王者荣耀',
              icon: 'icon-zhuomian',
              keepAlive: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "wzry-table" */ '@/views/shared/demos/tables/wzry-table/index.vue'
              ),
          },
          {
            path: 'lol',
            name: `${moduleName}-table-lol`,
            meta: {
              title: '英雄联盟',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "lol-table" */ '@/views/shared/demos/tables/lol-table/index.vue'
              ),
          },
          {
            path: 'lol/:id',
            name: `${moduleName}-table-lol-info`,
            meta: {
              title: '英雄详情',
              icon: 'icon-zhuomian',
              hideInMenu: true,
              keepAlive: true,
              activeMenu: `${moduleName}-table-lol`,
            },
            component: () =>
              import(
                /* webpackChunkName: "lol-info-table" */ '@/views/shared/demos/tables/lol-table/heroInfo.vue'
              ),
          },
        ],
      },
      {
        path: 'icons',
        name: `${moduleName}-icons`,
        meta: {
          title: '自定义图标',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/shared/demos/icons/Iconfont.vue'),
      },
    ],
  },
];

export default routes;
