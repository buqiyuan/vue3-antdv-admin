export {};

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    titleKey?: string;
    icon?: string;
    public?: boolean;
    hideInMenu?: boolean;
    keepAlive?: boolean;
    pending?: boolean;
    componentPath?: string;
    isExt?: boolean;
    iframeSrc?: string;
  }
}
