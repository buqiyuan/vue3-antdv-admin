import { asyncRoutes } from '../asyncModules';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import IFramePage from '@/components/basic/iframe-page';
import { warn } from '@/utils/log';
import { rootRoute } from '@/router/routes';
import router from '@/router';
import basic from '@/router/routes/basic';
import routeModules from '@/router/routes/modules';
import { uniqueSlash } from '@/utils/urlUtils';

export const transformMenuToRoutes = (
  routeList: RouteRecordRaw[],
  parentRoute?: RouteRecordRaw,
) => {
  routeList.forEach((route) => {
    route.meta ||= {} as RouteMeta;
    const { show = 1, type, isExt, extOpenMode } = route.meta;
    const compPath = route.component as unknown as string;

    // 是否在菜单中隐藏
    route.meta.hideInMenu ??= !show;

    // 规范化路由路径
    route.path = route.path.startsWith('/') ? route.path : `/${route.path}`;
    if (parentRoute?.path && !route.path.startsWith(parentRoute.path)) {
      route.path = uniqueSlash(`${parentRoute.path}/${route.path}`);
    }
    // 以路由路径作为唯一的路由名称
    route.name = route.path;

    if (type === 0) {
      route.component = null;
      if (route.children?.length) {
        const redirectChild = route.children.find((n) => !n.meta?.isExt);
        if (!redirectChild) {
          Reflect.deleteProperty(route, 'redirect');
        } else {
          route.redirect ??= uniqueSlash(`/${route.path}/${redirectChild.path}`);
        }
      }
    } else if (type === 1) {
      // 内嵌页面
      if (isExt && extOpenMode === 2) {
        route.component = <IFramePage src={route.path} />;
        route.path = route.path.replace(new RegExp('://'), '/');
      } else if (compPath) {
        route.component = asyncRoutes[compPath];
        // 前端 src/views 目录下无对应路由组件
        if (!route.component) {
          route.component = () => import('@/views/error/comp-not-found.vue');
          warn(`在src/views/下找不到 ${compPath}.vue 或 ${compPath}.tsx, 请自行创建!`);
        }
      }
    }

    if (route.children?.length) {
      transformMenuToRoutes(route.children, route);
    }
  });
  return routeList;
};

export const generateDynamicRoutes = (menus: RouteRecordRaw[]) => {
  const routes = [...routeModules, ...transformMenuToRoutes(menus)];
  const allRoute = [...routes, ...basic];
  genNamePathForRoutes(allRoute);
  rootRoute.children = allRoute;
  router.addRoute(rootRoute);
  console.log('routes', router.getRoutes());
  return routes;
};

/**
 * 主要方便于设置 a-menu 的 open-keys，即控制左侧菜单应当展开哪些菜单
 * @param {RouteRecordRaw[]} routes 需要添加 namePath 的路由
 * @param {string[]} namePath
 */
export const genNamePathForRoutes = (routes: RouteRecordRaw[], parentNamePath: string[] = []) => {
  routes.forEach((item) => {
    if (item.meta && typeof item.name === 'string') {
      item.meta.namePath = parentNamePath.concat(item.name);

      if (item.meta?.hideInMenu) {
        item.meta.activeMenu ||= parentNamePath.at(-1);
      }

      if (item.children?.length) {
        genNamePathForRoutes(item.children, item.meta.namePath);
      }
    }
  });
};
