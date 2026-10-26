import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/auth/token";
import { i18n } from "@/locales";
import { useUserStore } from "@/stores/user";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/index.vue"),
      meta: { public: true, titleKey: "login.title" },
    },
    {
      path: "/",
      name: "Root",
      component: () => import("@/layouts/AdminLayout.vue"),
      redirect: "/dashboard/welcome",
      children: [
        {
          path: "/dashboard/welcome",
          name: "DashboardWelcome",
          component: () => import("@/views/dashboard/welcome/index.vue"),
          meta: { titleKey: "dashboard.title" },
        },
        {
          path: "/system/user",
          name: "SystemUser",
          component: () => import("@/views/system/user/index.vue"),
          meta: { titleKey: "user.title" },
        },
        {
          path: "/system/role",
          name: "SystemRole",
          component: () => import("@/views/system/role/index.vue"),
          meta: { titleKey: "role.title" },
        },
        {
          path: "/system/menu",
          name: "SystemMenu",
          component: () => import("@/views/system/menu/index.vue"),
          meta: { titleKey: "menu.title" },
        },
        {
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          component: () => import("@/views/error/not-found.vue"),
          meta: { titleKey: "error.notFound", hideInMenu: true },
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();

  if (to.meta.public) {
    if (to.name === "Login" && getToken()) return { path: "/" };
    return true;
  }

  if (!getToken()) return { name: "Login", query: { redirect: to.fullPath } };

  if (!userStore.loaded) {
    try {
      await userStore.refreshSession();
    } catch {
      userStore.resetSession();
      return { name: "Login", query: { redirect: to.fullPath } };
    }
    return { path: to.fullPath, query: to.query, hash: to.hash, replace: true };
  }

  return true;
});

router.afterEach((to) => {
  const titleKey = to.meta.titleKey;
  const title = to.meta.title || (titleKey ? i18n.global.t(titleKey) : "");
  document.title = title
    ? `${title} · ${import.meta.env.VITE_APP_TITLE || "Admin"}`
    : import.meta.env.VITE_APP_TITLE || "Admin";
});
