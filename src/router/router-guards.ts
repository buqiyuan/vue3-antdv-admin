import { isNavigationFailure, Router } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { useKeepAliveStore } from '@/store/modules/keepAlive';
import NProgress from 'nprogress'; // progress bar
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { type WhiteNameList, LOGIN_NAME, REDIRECT_NAME } from './constant';

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
        // 如果不需要每次切换路由获取最新的动态路由，可把下面注释放开
        if (userStore.menus.length === 0) {
          // 从后台获取菜单
          await userStore.afterLogin();
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

  router.afterEach((to, _, failure) => {
    const keepAliveStore = useKeepAliveStore();

    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }
    // 在这里设置需要缓存的组件名称
    const componentName = to.matched.find((item) => item.name == to.name)?.components?.default.name;
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
    if (to.name == REDIRECT_NAME) {
      componentName && keepAliveStore.remove(componentName);
    }
    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
