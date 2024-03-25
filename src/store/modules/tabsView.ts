import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import {
  useRoute,
  type RouteLocationMatched,
  type RouteLocationNormalizedLoaded,
} from 'vue-router';
import { useKeepAliveStore } from './keepAlive';
import { useLayoutSettingStore } from './layoutSetting';
import { store } from '@/store';
import router from '@/router';
import { LOGIN_NAME, REDIRECT_NAME, PAGE_NOT_FOUND_NAME } from '@/router/constant';

/** 不需要出现在标签页中的路由 */
export const routeExcludes = [REDIRECT_NAME, LOGIN_NAME, PAGE_NOT_FOUND_NAME] as const;

export const useTabsViewStore = defineStore(
  'tabs-view',
  () => {
    const currentRoute = useRoute();
    const layoutSettingStore = useLayoutSettingStore();
    const tabsList = ref<RouteLocationNormalizedLoaded[]>([]);

    const getTabsList = computed(() => {
      return tabsList.value.filter((item) => {
        return item && !isInRouteExcludes(item) && router.hasRoute(item.name!);
      });
    });
    /** 当前activity tab */
    const getCurrentTab = computed(() => {
      return tabsList.value.find((item) => {
        return item && !isInRouteExcludes(item) && item.fullPath === currentRoute.fullPath;
      });
    });

    /** 给定的路由是否在排除名单里面 */
    const isInRouteExcludes = (route: RouteLocationNormalizedLoaded) => {
      return route.meta?.hideInTabs || routeExcludes.some((n) => n === route.name);
    };

    /** 将已关闭的标签页的组件从keep-alive中移除 */
    const delCompFromClosedTabs = (closedTabs: RouteLocationNormalizedLoaded[]) => {
      const keepAliveStore = useKeepAliveStore();
      const routes = router.getRoutes();
      const compNames = closedTabs.reduce<string[]>((prev, curr) => {
        if (curr.name && router.hasRoute(curr.name)) {
          const componentName = routes.find((n) => n.name === curr.name)?.components?.default?.name;
          componentName && prev.push(componentName);
        }
        return prev;
      }, []);
      keepAliveStore.remove(compNames);
    };

    const getRawRoute = (route: RouteLocationNormalizedLoaded): RouteLocationNormalizedLoaded => {
      return {
        ...route,
        matched: route.matched.map((item) => {
          const { meta, path, name } = item;
          return { meta, path, name };
        }) as RouteLocationMatched[],
      };
    };

    /** 添加标签页 */
    const addTabs = (route: RouteLocationNormalizedLoaded) => {
      if (isInRouteExcludes(route)) {
        return false;
      }
      const isExists = tabsList.value.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        tabsList.value.push(getRawRoute(route));
      }
      return true;
    };
    /** 关闭左侧 */
    const closeLeftTabs = (route: RouteLocationNormalizedLoaded) => {
      const index = tabsList.value.findIndex((item) => item.fullPath == route.fullPath);
      delCompFromClosedTabs(tabsList.value.splice(0, index));
    };
    /** 关闭右侧 */
    const closeRightTabs = (route: RouteLocationNormalizedLoaded) => {
      const index = tabsList.value.findIndex((item) => item.fullPath == route.fullPath);
      delCompFromClosedTabs(tabsList.value.splice(index + 1));
    };
    /** 关闭其他 */
    const closeOtherTabs = (route: RouteLocationNormalizedLoaded) => {
      const targetIndex = tabsList.value.findIndex((item) => item.fullPath === route.fullPath);
      if (targetIndex !== -1) {
        const current = tabsList.value.splice(targetIndex, 1);
        delCompFromClosedTabs(tabsList.value);
        tabsList.value = current;
      }
    };
    /** 关闭当前页 */
    const closeCurrentTab = (route: RouteLocationNormalizedLoaded) => {
      const index = tabsList.value.findIndex((item) => item.fullPath == route.fullPath);
      const isDelCurrentTab = Object.is(getCurrentTab.value, tabsList.value[index]);
      delCompFromClosedTabs(tabsList.value.splice(index, 1));
      // 如果关闭的tab就是当前激活的tab，则重定向页面
      if (isDelCurrentTab) {
        const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
        router.push(currentRoute);
      }
    };
    /** 关闭全部 */
    const closeAllTabs = () => {
      delCompFromClosedTabs(tabsList.value);
      tabsList.value = [];
    };
    // 更新tab标题
    const updateTabTitle = (title: string) => {
      const currentRoute = router.currentRoute.value;
      const upTarget = tabsList.value.find((item) => item.fullPath === currentRoute.fullPath);
      if (upTarget) {
        upTarget.meta.title = title;
      }
    };

    watch(
      () => currentRoute.fullPath,
      () => {
        addTabs(currentRoute);
      },
      { immediate: true },
    );

    window.addEventListener('beforeunload', () => {
      if (!layoutSettingStore.layoutSetting.cacheTabs) {
        if (isInRouteExcludes(currentRoute)) {
          tabsList.value = [tabsList.value[0]];
        } else {
          tabsList.value = [getCurrentTab.value || tabsList.value[0]];
        }
        tabsList.value = tabsList.value.filter(Boolean);
      }
    });

    return {
      tabsList,
      getTabsList,
      getCurrentTab,
      addTabs,
      closeLeftTabs,
      closeRightTabs,
      closeOtherTabs,
      closeCurrentTab,
      closeAllTabs,
      updateTabTitle,
    };
  },
  {
    persist: {
      paths: ['tabsList'],
    },
  },
);

// 在组件setup函数外使用
export function useTabsViewStoreWithOut() {
  return useTabsViewStore(store);
}
