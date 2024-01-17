import { type RouteRecordRaw } from 'vue-router';
import { asyncRoutes } from '../asyncModules';
import RouterView from '@/layout/routerView/index.vue';
import { warn } from '@/utils/log';
import ComponentNotFound from '@/views/error/comp-not-found.vue';
import { rootRoute } from '@/router/routes';
import router from '@/router';
import basic from '@/router/routes/basic';
// import routeModules from '@/router/routes/modules';

export const transformMenuToRoutes = (routeList: RouteRecordRaw[]) => {
  routeList.forEach((route) => {
    const compPath = route.component as unknown as string;

    if (typeof route.meta === 'object') {
      const { show = 1 } = route.meta;
      route.meta.hideInMenu ??= !show;
    }

    if (compPath === 'LAYOUT') {
      route.component = RouterView;
    } else {
      route.component = asyncRoutes[compPath];
      // 前端 src/views 目录下无对应路由组件
      if (!route.component) {
        route.component = ComponentNotFound;
        warn(`在src/views/下找不到 ${compPath}.vue 或 ${compPath}.tsx, 请自行创建!`);
      }
    }

    if (route.children?.length) {
      transformMenuToRoutes(route.children);
    }
  });
  return routeList;
};

export const generateDynamicRoutes = (menus: RouteRecordRaw[]) => {
  const routes = transformMenuToRoutes(menus);
  rootRoute.children = [...routes, ...basic];
  router.addRoute(rootRoute);
  console.log('routes', routes, router.getRoutes());

  return routes;
};
