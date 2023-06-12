import { Result } from 'ant-design-vue';
import { notFound, errorRoute } from './staticModules/error';
import { REDIRECT_ROUTE } from './staticModules/besidesLayout';
import outsideLayout from './outsideLayout';
import type { PermissionType } from '@/core/permission/modules/types';
import type { RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';
import { isUrl } from '@/utils/is';
import { uniqueSlash } from '@/utils/urlUtils';
import { asyncRoutes } from '@/router/asyncModules';
import common from '@/router/staticModules';
import router, { routes } from '@/router';
import NotFound from '@/views/error/404.vue';
import IFramePage from '@/components/basic/iframe-page';

// 需要放在所有路由之后的路由
const endRoutes: RouteRecordRaw[] = [REDIRECT_ROUTE, errorRoute, notFound];

export function filterAsyncRoute(
  routes: API.Menu[],
  parentRoute: API.Menu | null = null,
  lastNamePath: string[] = [],
): RouteRecordRaw[] {
  return routes
    .filter((item) => item.type !== 2 && item.isShow && item.parentId == parentRoute?.id)
    .map((item) => {
      const { router, viewPath, name, icon, orderNum, keepalive, isExt, openMode } = item;
      let fullPath = '';
      const pathPrefix = lastNamePath.at(-1) || '';
      if (isUrl(router)) {
        fullPath = router;
      } else {
        fullPath = router.startsWith('/') ? router : `/${router}`;
        fullPath = router.startsWith(pathPrefix) ? fullPath : pathPrefix + fullPath;
        fullPath = [...new Set(uniqueSlash(fullPath).split('/'))].join('/');
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
      realRoutePath = realRoutePath.replace(/http(s)?:\/\//, '');
      const route: Partial<RouteRecordRaw> = {
        path: realRoutePath,
        // name: `${viewPath ? toHump(viewPath) : fullPath}-${item.id}`,
        name: fullPath,
        meta: {
          orderNum,
          isExt,
          openMode,
          icon,
          title: name,
          type: item.type,
          perms: [],
          namePath: lastNamePath.concat(fullPath),
          keepAlive: keepalive,
        },
      };

      // 如果是目录
      if (item.type === 0) {
        const children = filterAsyncRoute(routes, item, lastNamePath.concat(fullPath));
        if (children?.length) {
          route.component = RouterView;
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
        // 如果是页面
      } else if (item.type === 1) {
        const Component =
          isExt && openMode === 2 ? (
            <IFramePage src={fullPath} />
          ) : (
            asyncRoutes[viewPath] || NotFound
          );
        route.component = Component;

        const perms = routes
          .filter((n) => n.parentId === item.id)
          .flatMap((n) => n.perms?.split(','));
        if (route.meta && perms) {
          // 设置当前页面所拥有的权限
          route.meta.perms = perms as PermissionType[];
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
export const generatorDynamicRouter = (asyncMenus: API.Menu[]) => {
  try {
    // console.log('asyncMenus', asyncMenus);
    const routeList = filterAsyncRoute(asyncMenus);
    const layout = routes.find((item) => item.name == 'Layout')!;
    // console.log(routeList, '根据后端返回的权限路由生成');
    // 给公共路由添加namePath
    generatorNamePath(common);
    const menus = [...common, ...routeList, ...endRoutes];
    layout.children = menus;
    const removeRoute = router.addRoute(layout);
    // 获取所有没有包含children的路由，上面addRoute的时候，vue-router已经帮我们拍平了所有路由
    const filterRoutes = router
      .getRoutes()
      .filter(
        (item) =>
          (!item.children.length || Object.is(item.meta?.hideChildrenInMenu, true)) &&
          !outsideLayout.some((n) => n.name === item.name),
      );
    // 清空所有路由
    removeRoute();
    layout.children = [...filterRoutes];
    // 重新添加拍平后的路由
    router.addRoute(layout);
    console.log('所有路由', router.getRoutes());

    return Promise.resolve({
      menus,
      routes: layout.children,
    });
  } catch (error) {
    console.error('生成路由时出错', error);
    return Promise.reject(`生成路由时出错: ${error}`);
  }
};

/**
 * 主要方便于控制a-menu的open-keys，即控制左侧菜单应当展开哪些菜单
 * @param {RouteRecordRaw[]} routes 需要添加namePath的路由
 * @param {string[]} namePath
 */
export const generatorNamePath = (
  routes: RouteRecordRaw[],
  namePath?: string[],
  parent?: RouteRecordRaw,
) => {
  routes.forEach((item) => {
    if (item.meta && typeof item.name === 'string') {
      item.meta.namePath = Array.isArray(namePath) ? namePath.concat(item.name) : [item.name];
      item.meta.fullPath = parent?.meta?.fullPath
        ? [parent.meta.fullPath, item.path].join('/')
        : item.path;
      item.meta.fullPath = uniqueSlash(item.meta.fullPath);

      if (item.children?.length) {
        generatorNamePath(item.children, item.meta.namePath, item);
      }
    }
  });
};
