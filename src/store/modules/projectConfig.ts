import { defineStore } from 'pinia';
import darkThemeCss from 'ant-design-vue/dist/antd.dark.css?raw';
import { useMutationObserver } from '@vueuse/core';
import { ConfigProvider } from 'ant-design-vue';
import type { Theme } from 'ant-design-vue/es/config-provider/';
import { store } from '@/store';
import { THEME_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';

const styleDom = document.createElement('style');
styleDom.dataset.type = 'theme-dark';
styleDom.textContent = darkThemeCss;
document.head.appendChild(styleDom);

useMutationObserver(
  document.head,
  (mutations) => {
    const hasCustomStyleEl = mutations.some((n) => Array.from(n.addedNodes).includes(styleDom));
    if (!hasCustomStyleEl) {
      document.head.appendChild(styleDom);
      styleDom.disabled = !document.documentElement.classList.contains('dark');
    }
  },
  {
    childList: true,
  },
);

/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 */

/** 主题色 */
export type ThemeName = 'light' | 'dark' | 'realDark';
export type { Theme };

export type ThemeState = {
  navTheme: ThemeName; // theme for nav menu
  primaryColor: string; // '#F5222D', // primary color of ant design
  layout: 'sidemenu' | 'topmenu'; // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid' | 'Fixed'; // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false; // sticky header
  fixSiderbar: false; // sticky siderbar
  colorWeak: false;
  menu: {
    locale: true;
  };
  title: string;
  pwa: false;
  iconfontUrl: string;
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
};

export const defaultConfig: ThemeState = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: 'rgb(24, 144, 255)', // '#F5222D', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'vite-antdv-admin',
  pwa: false,
  iconfontUrl: '',
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
};

// 设置黑暗主题
const setRealDarkTheme = (navTheme?: ThemeName) => {
  if (navTheme === 'realDark') {
    document.documentElement.classList.add('dark');
    styleDom.disabled = false;
  } else {
    document.documentElement.classList.remove('dark');
    styleDom.disabled = true;
  }
};

const getLocalThemeConfig = (): Partial<ThemeState> => {
  try {
    return JSON.parse(Storage.get(THEME_KEY, '{}'));
  } catch {
    return {};
  }
};

const localThemeConfig = getLocalThemeConfig();
const { primaryColor, navTheme } = localThemeConfig;
setRealDarkTheme(navTheme);
primaryColor &&
  ConfigProvider.config({
    theme: {
      primaryColor,
    },
  });

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    ...defaultConfig,
    ...localThemeConfig,
  }),
  getters: {
    getNavTheme(): ThemeName {
      return this.navTheme;
    },
  },
  actions: {
    setTheme(theme: Partial<ThemeState>) {
      for (const key in theme) {
        this[key] = theme[key];
      }
      // document.documentElement.style.setProperty(key, nextTheme[key]);
      theme.navTheme && setRealDarkTheme(theme.navTheme);
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
    /** antdv自带的改变主题颜色方法，但可以配置的颜色很有限，仅6种 */
    fillColor(theme: Theme) {
      this.primaryColor = theme.primaryColor ?? this.primaryColor;
      ConfigProvider.config({
        theme,
      });
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
  },
});

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store);
}
