import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import { TABS_ROUTES } from '@/enums/cacheEnum';

interface TabsViewState {
  /** 标签页 */
  tabsList: RouteLocationNormalized[];
  /** 需要缓存的路由组件名称列表 */
  keepAliveComponents: string[];
}

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login'];

export const useTabsViewStore = defineStore({
  id: 'tabs-view',
  state: (): TabsViewState => ({
    tabsList: [],
    keepAliveComponents: [],
  }),
  actions: {
    initTabs(routes) {
      // 初始化标签页
      this.tabsList = routes;
    },
    addTabs(route): boolean {
      // 添加标签页
      if (whiteList.includes(route.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(route) {
      // 关闭左侧
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(0, index);
    },
    closeRightTabs(route) {
      // 关闭右侧
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index + 1);
    },
    closeOtherTabs(route) {
      // 关闭其他
      this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath);
    },
    closeCurrentTab(route) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // 关闭全部
      this.tabsList = [];
      localStorage.removeItem(TABS_ROUTES);
    },
    setKeepAliveComponents(compNames: string[]) {
      this.keepAliveComponents = compNames;
    },
  },
});
