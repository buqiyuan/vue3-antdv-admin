<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import MenuIcon from "@/components/admin/MenuIcon.vue";
import type { NavItem } from "@/router/menu-model";

withDefaults(
  defineProps<{
    items: NavItem[];
    collapsed?: boolean;
    depth?: number;
  }>(),
  {
    collapsed: false,
    depth: 0,
  },
);

const emit = defineEmits<{ navigate: [] }>();
const route = useRoute();

function active(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <ul class="grid gap-1">
    <li v-for="item in items" :key="`${item.path}-${item.title}`">
      <div v-if="item.children?.length" class="grid gap-1">
        <div
          v-if="!collapsed"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-sidebar-foreground/70"
          :style="{ paddingLeft: `${12 + depth * 12}px` }"
        >
          <MenuIcon :name="item.icon" directory />
          <span class="truncate">{{ item.title }}</span>
        </div>
        <SidebarNav
          :items="item.children"
          :collapsed="collapsed"
          :depth="collapsed ? 0 : depth + 1"
          @navigate="emit('navigate')"
        />
      </div>
      <a
        v-else-if="item.external"
        :href="item.path"
        target="_blank"
        rel="noreferrer"
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
        :title="item.title"
      >
        <MenuIcon :name="item.icon" />
        <span v-if="!collapsed" class="truncate">{{ item.title }}</span>
      </a>
      <RouterLink
        v-else
        :to="item.path"
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
        :class="active(item.path) ? 'bg-sidebar-accent font-medium' : ''"
        :style="collapsed ? undefined : { paddingLeft: `${12 + depth * 12}px` }"
        :title="item.title"
        @click="emit('navigate')"
      >
        <MenuIcon :name="item.icon" />
        <span v-if="!collapsed" class="truncate">{{ item.title }}</span>
      </RouterLink>
    </li>
  </ul>
</template>
