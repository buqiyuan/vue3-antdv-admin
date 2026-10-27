import { RouterView, type RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant';
import { getRouter } from '@/router/navigation';
import { resolveRedirectTarget } from '@/router/routeLocation';

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
        const { params, query, hash } = to;
        const { path, redirectType = 'path' } = params;

        Reflect.deleteProperty(params, '_redirect_type');
        Reflect.deleteProperty(params, 'path');

        const _path = Array.isArray(path) ? path.join('/') : path;
        setTimeout(() => {
          const router = getRouter();
          router.replace(
            resolveRedirectTarget({
              pathParam: _path,
              redirectType: String(redirectType),
              query,
              hash,
              params,
            }),
          );
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
  component: () => import('@/views/error/404.vue'),
};

export default [REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
