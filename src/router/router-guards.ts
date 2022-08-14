import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import { LOGIN_NAME, REDIRECT_NAME } from './constant';
import type { WhiteNameList } from './constant';
import type { Router, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { useKeepAliveStore } from '@/store/modules/keepAlive';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { to as _to } from '@/utils/awaitTo';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const defaultRoutePath = '/dashboard/welcome';

export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    NProgress.start(); // start progress bar
    const token = Storage.get(ACCESS_TOKEN_KEY, null);

    if (token) {
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath });
        NProgress.done();
      } else {
        const hasRoute = router.hasRoute(to.name!);
        if (userStore.menus.length === 0) {
          // 从后台获取菜单
          const [err] = await _to(userStore.afterLogin());
          if (err) {
            userStore.resetToken();
            return next({ name: LOGIN_NAME });
          }
          if (!hasRoute) {
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent((from.query.redirect || '') as string);
            if (to.path === redirect) {
              next({ ...to, replace: true });
            } else {
              // 跳转到目的路由
              next({ ...to, replace: true });
            }
          }

          if (whiteNameList.some((n) => n === to.name) || hasRoute) {
            // 在免登录名单，直接进入
            next();
          }
        } else {
          next();
        }
      }
    } else {
      // not login
      if (whiteNameList.some((n) => n === to.name)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ name: LOGIN_NAME, query: { redirect: to.fullPath }, replace: true });
        NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  });

  /** 获取路由对应的组件名称 */
  const getComponentName = (route: RouteLocationNormalized) => {
    return route.matched.find((item) => item.name === route.name)?.components?.default.name;
  };

  router.afterEach((to, from, failure) => {
    const keepAliveStore = useKeepAliveStore();
    const token = Storage.get(ACCESS_TOKEN_KEY, null);

    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }
    // 在这里设置需要缓存的组件名称
    const componentName = getComponentName(to);
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 componentName 信息存入 keep-alive 全局状态
    if (to.meta?.keepAlive) {
      // 需要缓存的组件
      if (componentName) {
        keepAliveStore.add(componentName);
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`,
        );
      }
    } else {
      // 不需要缓存的组件
      if (componentName) {
        keepAliveStore.remove(componentName);
      }
    }
    // 如果进入的是 Redirect 页面，则也将离开页面的缓存清空
    if (to.name === REDIRECT_NAME) {
      const componentName = getComponentName(from);
      componentName && keepAliveStore.remove(componentName);
    }
    // 如果用户已登出，则清空所有缓存的组件
    if (!token) {
      keepAliveStore.clear();
    }
    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
