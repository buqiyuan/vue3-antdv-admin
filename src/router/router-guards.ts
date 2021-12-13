import { isNavigationFailure, Router } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { useTabsViewStore } from '@/store/modules/tabsView';
import NProgress from 'nprogress'; // progress bar
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const allowList = ['login', 'icons', 'error', 'error-404']; // no redirect whitelist

const loginRoutePath = '/login';
const defaultRoutePath = '/dashboard';

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    NProgress.start(); // start progress bar
    const token = Storage.get(ACCESS_TOKEN_KEY);
    if (token) {
      if (to.name === 'login') {
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

          if (allowList.includes(to.name as string) || hasRoute) {
            // 在免登录名单，直接进入
            next();
          }
        } else {
          next();
        }
      }
    } else {
      // not login
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath }, replace: true });
        NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  });

  router.afterEach((to, _, failure) => {
    const tabsViewStore = useTabsViewStore();

    document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = tabsViewStore.keepAliveComponents;
    const currentComName = to.matched.find((item) => item.name == to.name)?.components?.default
      .name;
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = tabsViewStore.keepAliveComponents.findIndex((name) => name == currentComName);
      if (index != -1) {
        keepAliveComponents.splice(index, 1);
      }
    }
    tabsViewStore.setKeepAliveComponents(keepAliveComponents);
    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
