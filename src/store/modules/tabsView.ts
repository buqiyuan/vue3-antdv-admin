import { type RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import { TABS_ROUTES } from '@/enums/cacheEnum';
import router from '@/router';

interface TabsViewState {
  /** 标签页 */
  tabsList: RouteLocationNormalized[];
}

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login', '404'] as const;

export const useTabsViewStore = defineStore({
  id: 'tabs-view',
  state: (): TabsViewState => ({
    tabsList: [],
  }),
  actions: {
    // 初始化标签页
    initTabs(routes) {
      this.tabsList = routes;
    },
    /** 添加标签页 */
    addTabs(route): boolean {
      if (whiteList.includes(route.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    /** 关闭左侧 */
    closeLeftTabs(route) {
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(0, index);
    },
    /** 关闭右侧 */
    closeRightTabs(route) {
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index + 1);
    },
    /** 关闭其他 */
    closeOtherTabs(route) {
      this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath);
    },
    /** 关闭当前页 */
    closeCurrentTab(route) {
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index, 1);
    },
    /** 关闭全部 */
    closeAllTabs() {
      this.tabsList = [];
      localStorage.removeItem(TABS_ROUTES);
    },
    // 更新tab标题
    updateTabTitle(title: string) {
      const currentRoute = router.currentRoute.value;
      const upTarget = this.tabsList.find((item) => item.fullPath === currentRoute.fullPath);
      if (upTarget) {
        upTarget.meta.title = title;
      }
    },
  },
});
