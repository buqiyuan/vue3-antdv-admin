import { RouterView, type RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant';
import router from '@/router';

/**
 * 重定向路由 主要用于刷新当前页面
 */
export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideInBreadcrumb: true,
    hideInMenu: true,
  },
  children: [
    {
      path: ':path(.*)',
      name: REDIRECT_NAME,
      component: RouterView,
      meta: {
        title: REDIRECT_NAME,
        hideInMenu: true,
      },
      beforeEnter: (to) => {
        const { params, query } = to;
        const { path, redirectType = 'path' } = params;

        Reflect.deleteProperty(params, '_redirect_type');
        Reflect.deleteProperty(params, 'path');

        const _path = Array.isArray(path) ? path.join('/') : path;
        setTimeout(() => {
          if (redirectType === 'name') {
            router.replace({
              name: _path,
              query,
              params,
            });
          } else {
            router.replace({
              path: _path.startsWith('/') ? _path : `/${_path}`,
              query,
            });
          }
        });
        return true;
      },
    },
  ],
};

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  meta: {
    title: 'PageNotFound',
    hideInMenu: true,
    hideInTabs: true,
  },
  children: [
    {
      path: '/:pathMatch(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: 'PageNotFound',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export default [REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
