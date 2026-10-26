import type { RouteRecordRaw, Router } from "vue-router";
import { collectPages, type BackendMenu } from "./menu-model";

const views = import.meta.glob("../views/**/*.vue");
const staticPaths = new Set(["/dashboard/welcome", "/system/user", "/system/role", "/system/menu"]);
const dynamicNames: string[] = [];

function viewKey(component: string) {
  const normalized = component.replace(/^\/+/, "").replace(/\.vue$/, "");
  const candidates = [`../views/${normalized}.vue`, `../views/${normalized}/index.vue`];
  return candidates.find((key) => views[key]);
}

export function resetDynamicRoutes(router: Router) {
  for (const name of dynamicNames) {
    if (router.hasRoute(name)) router.removeRoute(name);
  }
  dynamicNames.length = 0;
}

export function registerDynamicRoutes(router: Router, menus: BackendMenu[]) {
  resetDynamicRoutes(router);
  for (const page of collectPages(menus)) {
    if (staticPaths.has(page.path) || router.hasRoute(page.path)) continue;

    const matched = page.component ? viewKey(page.component) : undefined;
    const route: RouteRecordRaw = {
      path: page.path,
      name: page.path,
      component: page.iframeSrc
        ? views["../views/iframe/index.vue"]
        : matched
          ? views[matched]
          : views["../views/pending/index.vue"],
      meta: {
        title: page.title,
        icon: page.icon,
        hideInMenu: page.hideInMenu,
        keepAlive: page.keepAlive,
        componentPath: page.component,
        pending: !page.iframeSrc && !matched,
        iframeSrc: page.iframeSrc,
      },
    };
    router.addRoute("Root", route);
    dynamicNames.push(page.path);
  }
}
