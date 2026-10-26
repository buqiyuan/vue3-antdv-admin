export interface BackendMenu {
  id?: number;
  path: string;
  name: string;
  component?: string;
  redirect?: string;
  meta?: {
    title?: string;
    icon?: string;
    isExt?: boolean;
    extOpenMode?: number;
    type?: number;
    orderNo?: number;
    show?: number | boolean;
    keepAlive?: number | boolean;
    status?: number;
    activeMenu?: string;
    permission?: string;
  };
  children?: BackendMenu[];
}

export interface NavItem {
  id?: number;
  title: string;
  icon?: string;
  path: string;
  external?: boolean;
  children?: NavItem[];
}

export interface PageRoute {
  path: string;
  component?: string;
  title: string;
  icon?: string;
  hideInMenu: boolean;
  keepAlive: boolean;
  iframeSrc?: string;
}

export function normalizePath(path: string) {
  const parts = path.split("/").filter(Boolean);
  return `/${parts.join("/")}`;
}

export function joinMenuPath(parentPath: string, path: string) {
  if (!path) return normalizePath(parentPath || "/");
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/")) return normalizePath(path);
  return normalizePath(`${parentPath}/${path}`);
}

export function isMenuVisible(menu: BackendMenu) {
  const show = menu.meta?.show;
  return show !== 0 && show !== false;
}

export function sortMenus(menus: BackendMenu[]): BackendMenu[] {
  return [...menus]
    .map((menu) => ({
      ...menu,
      children: menu.children ? sortMenus(menu.children) : undefined,
    }))
    .sort((a, b) => (a.meta?.orderNo ?? 0) - (b.meta?.orderNo ?? 0));
}

function isExternalUrl(path: string) {
  return /^https?:\/\//.test(path);
}

export function toNavItems(menus: BackendMenu[], parent = ""): NavItem[] {
  return sortMenus(menus).flatMap((menu) => {
    if (menu.meta?.type === 2 || menu.meta?.status === 0 || !isMenuVisible(menu)) return [];

    const rawPath = joinMenuPath(parent, menu.path);
    const external = Boolean(
      menu.meta?.isExt && menu.meta.extOpenMode !== 2 && isExternalUrl(menu.path),
    );
    const iframe = Boolean(menu.meta?.isExt && menu.meta.extOpenMode === 2);
    const path = external
      ? menu.path
      : iframe
        ? `/ext/${menu.id ?? encodeURIComponent(menu.name)}`
        : rawPath;
    const children = menu.children?.length ? toNavItems(menu.children, rawPath) : undefined;
    if (menu.meta?.type === 0 && !children?.length) return [];

    return [
      {
        id: menu.id,
        title: menu.meta?.title || menu.name,
        icon: menu.meta?.icon,
        path,
        external,
        children,
      },
    ];
  });
}

export function collectPages(menus: BackendMenu[], parent = ""): PageRoute[] {
  const pages: PageRoute[] = [];
  for (const menu of sortMenus(menus)) {
    if (menu.meta?.type === 2 || menu.meta?.status === 0) continue;

    const rawPath = joinMenuPath(parent, menu.path);
    const external = Boolean(
      menu.meta?.isExt && menu.meta.extOpenMode !== 2 && isExternalUrl(menu.path),
    );
    const iframe = Boolean(menu.meta?.isExt && menu.meta.extOpenMode === 2);
    if (!external && menu.meta?.type !== 0) {
      pages.push({
        path: iframe ? `/ext/${menu.id ?? encodeURIComponent(menu.name)}` : rawPath,
        component: menu.component,
        title: menu.meta?.title || menu.name,
        icon: menu.meta?.icon,
        hideInMenu: !isMenuVisible(menu),
        keepAlive: menu.meta?.keepAlive === 1 || menu.meta?.keepAlive === true,
        iframeSrc: iframe ? menu.path : undefined,
      });
    }
    if (menu.children?.length) pages.push(...collectPages(menu.children, rawPath));
  }
  return pages;
}
