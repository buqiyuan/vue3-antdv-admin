import { Result } from 'ant-design-vue';
import { RouteRecordRaw } from 'vue-router';
import { isUrl } from '@/utils/is';
import { constantRouterComponents } from '@/router/asyncModules';
import { RouterTransition } from '@/components/transition';
import NotFound from '@/views/shared/error/404.vue';
import router, { routes } from '.';
import common from '@/router/staticModules';
import { notFound } from './staticModules/error';

export function filterAsyncRoute(
  routes: API.Menu[],
  parentRoute: API.Menu | null = null,
  lastKeyPath: string[] = [],
): RouteRecordRaw[] {
  return routes
    .filter((item) => item.type !== 2 && item.isShow && item.parentId == parentRoute?.id)
    .map((item) => {
      const { router, viewPath, name, icon, keepalive } = item;
      let fullPath = '';
      const pathPrefix = lastKeyPath.slice(-1)[0] || '';
      if (isUrl(router)) {
        fullPath = router;
      } else {
        fullPath = router.startsWith('/') ? router : '/' + router;
        fullPath = router.startsWith(pathPrefix) ? fullPath : pathPrefix + fullPath;
        fullPath = [...new Set(fullPath.split('/'))].join('/');
      }
      let realRoutePath = router;
      if (parentRoute) {
        if (fullPath.startsWith(parentRoute?.router)) {
          realRoutePath = fullPath.split(parentRoute.router)[1];
        } else if (!isUrl(parentRoute.router) && !isUrl(router)) {
          realRoutePath = router;
        }
      }
      realRoutePath = realRoutePath.startsWith('/') ? realRoutePath.slice(1) : realRoutePath;
      const route: Partial<RouteRecordRaw> = {
        path: realRoutePath,
        // name: `${viewPath ? toHump(viewPath) : fullPath}-${item.id}`,
        name: fullPath,
        meta: {
          title: name,
          perms: [],
          icon: icon,
          keyPath: lastKeyPath.concat(fullPath),
          keepAlive: keepalive,
        },
      };

      if (item.type === 0) {
        // 如果是目录
        const children = filterAsyncRoute(routes, item, lastKeyPath.concat(fullPath));
        if (children?.length) {
          route.component = RouterTransition;
          route.children = children;
          route.redirect = { name: children[0].name };
        } else {
          route.component = (
            <Result
              status="500"
              title={name}
              sub-title="目录类型菜单不是真实页面，请为当前目录添加页面级子菜单或更改当前菜单类型."
            />
          );
        }
        return route;
      } else if (item.type === 1) {
        // 如果是页面
        const Component = constantRouterComponents[viewPath] || NotFound;
        route.component = Component;
        const perms = routes.filter((n) => n.parentId === item.id).map((n) => n.perms?.split(','));
        if (route.meta && perms) {
          // 设置当前页面所拥有的权限
          route.meta.perms = perms.flat(Infinity) as string[];
        }
        return route;
      }
      return undefined;
    })
    .filter((item): item is RouteRecordRaw => !!item);
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (menus: API.Menu[]): RouteRecordRaw[] => {
  //      后端数据, 根级树数组,  根级 PID
  // listToTree(data, childrenNav, 0)
  // rootRouter.children = childrenNav
  try {
    console.log('menus', menus);

    const routeList = filterAsyncRoute(menus);
    const layout = routes.find((item) => item.name == 'Layout')!;
    console.log(routeList, '根据后端返回的权限路由生成');
    layout.children = [...common, ...routeList, notFound];
    // const routes = [...common,...routeList]
    // routes.forEach(item => router.addRoute('Layout', item))
    router.addRoute(layout);
    // router.addRoute(notFound)
    return layout.children;
  } catch (error) {
    console.error('生成路由时出错', error);
    return [];
  }
};
