export {};

interface Title18n {
  zh_CN: string;
  en_US: string;
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /** 标题 */
    title: string | Title18n;
    /** 当前路由是否需要权限验证 */
    isAuth?: boolean;
    /** 当前路由权限 */
    perms?: string[];
    /** 是否需要缓存 */
    keepAlive?: boolean;
    /** 当前路由keypath */
    keyPath?: string[];
    /** 是否固定在标签栏 */
    affix?: boolean;
    /** 菜单图标 */
    icon?: string;
    /** 当前页面切换动画 */
    transitionName?: string;
    /** 不在菜单中显示 */
    hideInMenu?: boolean;
    isLink?: boolean;
  }
}
