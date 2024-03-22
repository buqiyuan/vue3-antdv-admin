import type { RouteRecordRaw } from 'vue-router';
import { t } from '@/hooks/useI18n';

const moduleName = 'demos';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: moduleName,
    redirect: { name: `${moduleName}-custom-modal` },
    meta: {
      title: t('routes.demo.demo'),
      icon: 'ant-design:desktop-outlined',
    },
    children: [
      {
        path: 'custom-modal',
        name: `${moduleName}-custom-modal`,
        meta: {
          title: t('routes.demo.modal'),
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        component: () => import('@/views/demos/custom-modal.vue'),
      },
      {
        path: 'button',
        name: `${moduleName}-button`,
        meta: {
          title: t('routes.demo.button'),
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        component: () => import('@/views/demos/button.vue'),
      },
      {
        path: 'form',
        name: `${moduleName}-form`,
        meta: {
          title: t('routes.demo.form.demo'),
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        redirect: { name: `${moduleName}-form-basic` },
        children: [
          {
            path: 'basic',
            name: `${moduleName}-form-basic`,
            meta: {
              title: t('routes.demo.form.basic'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/form/basic-form/index.vue'),
          },
          {
            path: 'rule',
            name: `${moduleName}-form-rule`,
            meta: {
              title: t('routes.demo.form.rule'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/form/rule-form/index.vue'),
          },
          {
            path: 'dynamic',
            name: `${moduleName}-form-dynamic`,
            meta: {
              title: t('routes.demo.form.dynamic'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/form/dynamic-form/index.vue'),
          },
          {
            path: 'useForm',
            name: `${moduleName}-form-use`,
            meta: {
              title: 'useForm',
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/form/use-form/index.vue'),
          },
          {
            path: 'custom-form',
            name: `${moduleName}-form-custom`,
            meta: {
              title: t('routes.demo.form.customForm'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/form/custom-form/index.vue'),
          },
          {
            path: 'request-form',
            name: `${moduleName}-form-request`,
            meta: {
              title: '自定义请求表单',
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/form/request-form/index.vue'),
          },
        ],
      },
      {
        path: 'table',
        name: `${moduleName}-table`,
        meta: {
          title: t('routes.demo.table.demo'),
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        redirect: { name: `${moduleName}-table-wzry` },
        children: [
          {
            path: 'search-table',
            name: `${moduleName}-query-form`,
            meta: {
              title: t('routes.demo.table.searchTable'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/tables/search-table/index.vue'),
          },
          {
            path: 'edit-row-table',
            name: `${moduleName}-edit-row-table`,
            meta: {
              title: t('routes.demo.table.editRowTable'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/tables/edit-row-table/index.vue'),
          },
          {
            path: 'wzry',
            name: `${moduleName}-table-wzry`,
            meta: {
              title: t('routes.demo.table.wzry'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/tables/wzry-table/index.vue'),
          },
          {
            path: 'lol',
            name: `${moduleName}-table-lol`,
            meta: {
              title: t('routes.demo.table.lol'),
              icon: 'ant-design:desktop-outlined',
              keepAlive: false,
            },
            component: () => import('@/views/demos/tables/lol-table/index.vue'),
          },
          {
            path: 'lol/:id',
            name: `${moduleName}-table-lol-info`,
            meta: {
              title: '英雄详情',
              icon: 'ant-design:desktop-outlined',
              hideInMenu: true,
              keepAlive: false,
              activeMenu: `${moduleName}-table-lol`,
            },
            component: () => import('@/views/demos/tables/lol-table/heroInfo.vue'),
          },
        ],
      },
      {
        path: 'nested-routes',
        name: `${moduleName}-nested-routes`,
        redirect: { name: `${moduleName}-nested-routes-one` },
        meta: {
          title: '嵌套路由',
          icon: 'ant-design:desktop-outlined',
          hideChildrenInMenu: false,
          transitionName: false,
          keepAlive: true,
          hideProgressBar: true,
        },
        component: () => import('@/views/demos/nested-routes/index.vue'),
        children: [
          {
            path: 'route-one',
            name: `${moduleName}-nested-routes-one`,
            meta: {
              title: '路由一',
              icon: 'ant-design:desktop-outlined',
              hideInMenu: false,
            },
            component: () => import('@/views/demos/nested-routes/route-one.vue'),
          },
          {
            path: 'route-two',
            name: `${moduleName}-nested-routes-two`,
            meta: {
              title: '路由二',
              icon: 'ant-design:desktop-outlined',
              hideInMenu: false,
            },
            component: () => import('@/views/demos/nested-routes/route-two.vue'),
          },
          {
            path: 'route-three',
            name: `${moduleName}-nested-routes-three`,
            meta: {
              title: '路由三',
              icon: 'ant-design:desktop-outlined',
              hideInMenu: false,
            },
            component: () => import('@/views/demos/nested-routes/route-three.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
