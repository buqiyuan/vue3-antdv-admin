import { NavigationFailureType, isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import { Modal } from 'ant-design-vue';
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from './constant';
import type { WhiteNameList } from './constant';
import type { Router, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { useKeepAliveStore } from '@/store/modules/keepAlive';
import { to as _to } from '@/utils/awaitTo';
import { transformI18n } from '@/hooks/useI18n';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const defaultRoutePath = '/dashboard/welcome';

export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, from, next) => {
    if (!from.meta?.hideProgressBar || !to.meta?.hideProgressBar) {
      NProgress.start(); // start progress bar
    }
    const userStore = useUserStore();

    if (userStore.token) {
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath });
      } else {
        const hasRoute = router.hasRoute(to.name!);
        if (userStore.menus.length === 0) {
          // 从后台获取菜单
          const [err] = await _to(userStore.afterLogin());
          if (err) {
            userStore.clearLoginStatus();
            Modal.destroyAll();
            return next({ name: LOGIN_NAME });
          }
          // 解决警告：No match found for location with path "XXXXXXX"
          if (to.name === PAGE_NOT_FOUND_NAME) {
            next({ path: to.fullPath, replace: true });
          }
          // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
          else if (!hasRoute) {
            next({ ...to, replace: true });
          } else {
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
      }
    }
  });

  /** 获取路由对应的组件名称 */
  const getComponentName = (route: RouteLocationNormalized): string[] => {
    return route.matched
      .map((n) => {
        if (!n.meta?.keepAlive) return;
        const comp = n.components?.default;
        return comp?.name ?? (comp as any)?.type?.name;
      })
      .filter(Boolean);
  };

  router.afterEach((to, from, failure) => {
    // 跳过自己手动取消路由导航时的错误
    if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
      NProgress.done();
      // console.error('failed navigation', failure);
      return;
    }

    if (to.meta?.title) {
      // 设置网页标题
      document.title = transformI18n(to.meta.title);
    }

    const keepAliveStore = useKeepAliveStore();

    // 在这里设置需要缓存的组件名称
    const toCompName = getComponentName(to);
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 componentName 信息存入 keep-alive 全局状态
    if (to.meta?.keepAlive) {
      // 需要缓存的组件
      if (toCompName) {
        keepAliveStore.add(toCompName);
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`,
        );
      }
    } else {
      // 不需要缓存的组件
      if (toCompName) {
        keepAliveStore.remove(toCompName);
      }
    }
    // 如果进入的是 Redirect 页面，则也将离开页面的缓存清空(刷新页面的操作)
    if (to.name === REDIRECT_NAME) {
      const fromCompName = getComponentName(from);
      fromCompName && keepAliveStore.remove(fromCompName);
    }
    const userStore = useUserStore();
    // 如果用户已登出，则清空所有缓存的组件
    if (!userStore.token) {
      keepAliveStore.clear();
    }
    // console.log('keepAliveStore', keepAliveStore.list);
    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.error('路由错误', error);
  });
}
