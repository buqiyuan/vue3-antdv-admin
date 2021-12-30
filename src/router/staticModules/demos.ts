import { type RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';

const routeName = 'demos';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: routeName,
    redirect: '/demos/custom-a-custom-modal',
    component: RouterView,
    meta: {
      title: 'demo演示',
      icon: 'icon-zhuomian',
    },
    children: [
      {
        path: 'custom-a-custom-modal',
        name: `${routeName}-custom-modal`,
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
        name: `${routeName}-button`,
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
        name: `${routeName}-form`,
        meta: {
          title: '表单演示',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        redirect: { name: `${routeName}-form-rule` },
        component: RouterView,
        children: [
          {
            path: 'basic',
            name: `${routeName}-form-basic`,
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
            name: `${routeName}-form-rule`,
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
        name: `${routeName}-table`,
        meta: {
          title: '表格演示',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        redirect: { name: `${routeName}-table-wzry` },
        component: RouterView,
        children: [
          {
            path: 'wzry',
            name: `${routeName}-wzry-table`,
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
            name: `${routeName}-lol-table`,
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
            name: `${routeName}-lol-info-table`,
            meta: {
              title: '英雄详情',
              icon: 'icon-zhuomian',
              hideInMenu: true,
              keepAlive: true,
              activeMenu: `${routeName}-lol-table`,
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
        name: `${routeName}-icons`,
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
