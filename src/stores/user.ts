import { ref } from "vue";
import { defineStore } from "pinia";
import type { Router } from "vue-router";
import Api from "@/api";
import { clearToken, getRefreshToken, getToken, setToken } from "@/auth/token";
import { registerDynamicRoutes, resetDynamicRoutes } from "@/router/dynamic";
import { toNavItems, type BackendMenu, type NavItem } from "@/router/menu-model";

let boundRouter: Router | null = null;

export function bindRouter(router: Router) {
  boundRouter = router;
}

export type SessionProfile = API.AccountInfo & { id?: number };

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<Partial<SessionProfile>>({});
  const permissions = ref<string[]>([]);
  const menus = ref<NavItem[]>([]);
  const loaded = ref(false);

  function resetSession() {
    clearToken();
    userInfo.value = {};
    permissions.value = [];
    menus.value = [];
    loaded.value = false;
    if (boundRouter) resetDynamicRoutes(boundRouter);
  }

  async function refreshSession() {
    if (!getToken()) throw new Error("missing token");
    if (!boundRouter) throw new Error("router is not ready");

    const profile = await Api.account.accountProfile();
    const [menuData, permissionData] = await Promise.all([
      Api.account.accountMenu(),
      Api.account.accountPermissions(),
    ]);
    const rawMenus = menuData as unknown as BackendMenu[];
    userInfo.value = profile as SessionProfile;
    permissions.value = Array.isArray(permissionData) ? permissionData : [];
    menus.value = toNavItems(rawMenus);
    registerDynamicRoutes(boundRouter, rawMenus);
    loaded.value = true;
  }

  async function login(payload: API.LoginDto) {
    const data = await Api.auth.authLogin(payload);
    const issued = data as API.LoginToken & { refreshToken?: string };
    setToken(issued.token, issued.refreshToken);
    await refreshSession();
  }

  async function logout() {
    try {
      await Api.account.accountLogout({ showErrorMsg: false });
    } catch {
      // The access token is already rejected. Still drop the local session.
    }
    resetSession();
  }

  return {
    userInfo,
    permissions,
    menus,
    loaded,
    login,
    logout,
    refreshSession,
    resetSession,
    getRefreshToken,
  };
});
