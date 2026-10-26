<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Languages, LogOut, Menu, Moon, PanelLeft, Sun } from "@lucide/vue";
import MenuIcon from "@/components/admin/MenuIcon.vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { connectMenuStream } from "@/auth/sse";
import { getToken } from "@/auth/token";
import { useTheme } from "@/composables/useTheme";
import { setLocale, type AppLocale } from "@/locales";
import type { NavItem } from "@/router/menu-model";
import { useUserStore } from "@/stores/user";
import SidebarNav from "./SidebarNav.vue";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const user = useUserStore();
const mode = useTheme();
const collapsed = ref(false);
const mobileOpen = ref(false);
let stopStream: (() => void) | undefined;

const fallbackMenus = computed<NavItem[]>(() => [
  {
    title: t("dashboard.title"),
    path: "/dashboard/welcome",
    icon: "ant-design:dashboard-outlined",
  },
  { title: t("user.title"), path: "/system/user", icon: "ant-design:user-outlined" },
  { title: t("role.title"), path: "/system/role", icon: "ant-design:safety-outlined" },
  { title: t("menu.title"), path: "/system/menu", icon: "ant-design:menu-outlined" },
]);

const menus = computed(() => (user.menus.length > 0 ? user.menus : fallbackMenus.value));
const displayName = computed(() => user.userInfo.nickname || user.userInfo.username || "Admin");
const initials = computed(() => displayName.value.slice(0, 1).toUpperCase());
const crumbs = computed(() =>
  route.matched
    .map((record) => record.meta.title || (record.meta.titleKey ? t(record.meta.titleKey) : ""))
    .filter(Boolean),
);

watch(
  () => user.userInfo.id,
  (id) => {
    stopStream?.();
    stopStream = undefined;
    const token = getToken();
    if (!id || !token) return;
    stopStream = connectMenuStream(id, token, () => {
      void user.refreshSession();
    });
  },
  { immediate: true },
);

onUnmounted(() => stopStream?.());
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
  },
);

function toggleTheme() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}

function changeLocale(next: AppLocale) {
  setLocale(next);
}

async function logout() {
  await user.logout();
  await router.replace({ name: "Login" });
}
</script>

<template>
  <div class="flex min-h-screen bg-background text-foreground">
    <aside
      class="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex"
      :class="collapsed ? 'w-16' : 'w-64'"
    >
      <RouterLink to="/dashboard/welcome" class="flex h-14 items-center gap-2 px-4 font-semibold">
        <img src="@/assets/icons/logo.svg" alt="" class="size-7" />
        <span v-if="!collapsed" class="truncate">{{ t("app.name") }}</span>
      </RouterLink>
      <nav class="flex-1 overflow-y-auto px-2 pb-4">
        <SidebarNav :items="menus" :collapsed="collapsed" />
      </nav>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 items-center gap-2 border-b px-3 md:px-4">
        <Button
          class="md:hidden"
          variant="ghost"
          size="icon"
          :aria-label="t('layout.openMenu')"
          @click="mobileOpen = true"
        >
          <Menu />
        </Button>
        <Button
          class="hidden md:inline-flex"
          variant="ghost"
          size="icon"
          :aria-label="collapsed ? t('layout.expand') : t('layout.collapse')"
          @click="collapsed = !collapsed"
        >
          <PanelLeft />
        </Button>
        <p class="hidden min-w-0 flex-1 truncate text-sm text-muted-foreground sm:block">
          {{ crumbs.join(" / ") }}
        </p>
        <div class="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon" :aria-label="t('layout.language')">
                <Languages />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                :class="locale === 'zh-CN' ? 'font-medium' : ''"
                @click="changeLocale('zh-CN')"
              >
                中文
              </DropdownMenuItem>
              <DropdownMenuItem
                :class="locale === 'en' ? 'font-medium' : ''"
                @click="changeLocale('en')"
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" :aria-label="t('layout.theme')" @click="toggleTheme">
            <Moon v-if="mode === 'light'" />
            <Sun v-else />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="gap-2 px-2">
                <Avatar class="size-7">
                  <AvatarFallback>{{ initials }}</AvatarFallback>
                </Avatar>
                <span class="hidden max-w-32 truncate sm:inline">{{ displayName }}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{{ displayName }}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">
                <LogOut />
                {{ t("layout.logout") }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main class="flex-1 p-4 md:p-6">
        <router-view />
      </main>
    </div>

    <Sheet :open="mobileOpen" @update:open="mobileOpen = $event">
      <SheetContent side="left" class="w-72 bg-sidebar p-0 text-sidebar-foreground">
        <SheetHeader class="border-b border-sidebar-border px-4 py-3">
          <SheetTitle class="flex items-center gap-2 text-sidebar-foreground">
            <MenuIcon name="ant-design:dashboard-outlined" />
            {{ t("app.name") }}
          </SheetTitle>
        </SheetHeader>
        <nav class="p-2">
          <SidebarNav :items="menus" @navigate="mobileOpen = false" />
        </nav>
      </SheetContent>
    </Sheet>
  </div>
</template>
