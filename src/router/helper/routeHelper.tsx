import { RouterView } from 'vue-router';
import { asyncRoutes } from '../asyncModules';
import outsideLayout from '../routes/outsideLayout';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import IFramePage from '@/components/basic/iframe-page';
import { warn } from '@/utils/log';
import ComponentNotFound from '@/views/error/comp-not-found.vue';
import { rootRoute } from '@/router/routes';
import router from '@/router';
import basic from '@/router/routes/basic';
import routeModules from '@/router/routes/modules';

export const transformMenuToRoutes = (routeList: RouteRecordRaw[]) => {
  routeList.forEach((route) => {
    route.meta ||= {} as RouteMeta;
    const { show = 1, type, isExt, extOpenMode } = route.meta;
    const compPath = route.component as unknown as string;

    // 是否在菜单中隐藏
    route.meta.hideInMenu ??= !show;

    if (type === 0) {
      route.component = RouterView;
    } else if (type === 1) {
      // 内嵌页面
      if (isExt && extOpenMode === 2) {
        route.component = <IFramePage src={route.path} />;
        route.path = route.path.replace(new RegExp('://'), '/');
      } else if (compPath) {
        route.component = asyncRoutes[compPath];
        // 前端 src/views 目录下无对应路由组件
        if (!route.component) {
          route.component = ComponentNotFound;
          warn(`在src/views/下找不到 ${compPath}.vue 或 ${compPath}.tsx, 请自行创建!`);
        }
      }
    }

    if (route.children?.length) {
      transformMenuToRoutes(route.children);
    }
  });
  return routeList;
};

export const generateDynamicRoutes = (menus: RouteRecordRaw[]) => {
  const routes = [...routeModules, ...transformMenuToRoutes(menus)];
  const allRoute = [...routes, ...basic];
  genNamePathForRoutes(allRoute);
  rootRoute.children = allRoute;
  // 1. 让 vue-router 先帮我们拍平路由
  const removeRoute = router.addRoute(rootRoute);
  // 2. 获取所有没有包含 children 的路由，也就是页面级路由
  const filterRoutes = router.getRoutes().filter((item) => {
    const isLeaf = !item.children.length || Object.is(item.meta?.hideChildrenInMenu, true);
    const isOutsideRoute = outsideLayout.some((n) => n.name === item.name);
    return isLeaf && !isOutsideRoute;
  });
  // 3. 清空所有路由
  removeRoute();
  rootRoute.children = [...filterRoutes];
  // 4.重新添加拍平后的路由
  router.addRoute(rootRoute);
  // console.log('routes', router.getRoutes());

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
