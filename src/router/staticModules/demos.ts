import { type RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';
import { t } from '@/hooks/useI18n';

const moduleName = 'demos';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: moduleName,
    redirect: { name: `${moduleName}-custom-modal` },
    component: RouterView,
    meta: {
      title: t('routes.demo.demo'),
      icon: 'icon-zhuomian',
    },
    children: [
      {
        path: 'custom-modal',
        name: `${moduleName}-custom-modal`,
        meta: {
          title: t('routes.demo.modal'),
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "demos-custom-a-custom-modal" */ '@/views/demos/custom-modal.vue'
          ),
      },
      {
        path: 'button',
        name: `${moduleName}-button`,
        meta: {
          title: t('routes.demo.button'),
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () => import(/* webpackChunkName: "demos-button" */ '@/views/demos/button.vue'),
      },
      {
        path: 'form',
        name: `${moduleName}-form`,
        meta: {
          title: t('routes.demo.form.demo'),
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
              title: t('routes.demo.form.basic'),
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "basic-form" */ '@/views/demos/form/basic-form/index.vue'
              ),
          },
          {
            path: 'rule',
            name: `${moduleName}-form-rule`,
            meta: {
              title: t('routes.demo.form.rule'),
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(/* webpackChunkName: "rule-form" */ '@/views/demos/form/rule-form/index.vue'),
          },
        ],
      },
      {
        path: 'table',
        name: `${moduleName}-table`,
        meta: {
          title: t('routes.demo.table.demo'),
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        redirect: { name: `${moduleName}-table-wzry` },
        component: RouterView,
        children: [
          {
            path: 'search-table',
            name: `${moduleName}-query-form`,
            meta: {
              title: t('routes.demo.table.searchTable'),
              icon: 'icon-zhuomian',
              keepAlive: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "search-table" */ '@/views/demos/tables/search-table/index.vue'
              ),
          },
          {
            path: 'wzry',
            name: `${moduleName}-table-wzry`,
            meta: {
              title: t('routes.demo.table.wzry'),
              icon: 'icon-zhuomian',
              keepAlive: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "wzry-table" */ '@/views/demos/tables/wzry-table/index.vue'
              ),
          },
          {
            path: 'lol',
            name: `${moduleName}-table-lol`,
            meta: {
              title: t('routes.demo.table.lol'),
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "lol-table" */ '@/views/demos/tables/lol-table/index.vue'
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
                /* webpackChunkName: "lol-info-table" */ '@/views/demos/tables/lol-table/heroInfo.vue'
              ),
          },
        ],
      },
      {
        path: 'icons',
        name: `${moduleName}-icons`,
        meta: {
          title: t('routes.demo.icon'),
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/demos/icons/Iconfont.vue'),
      },
    ],
  },
];

export default routes;
