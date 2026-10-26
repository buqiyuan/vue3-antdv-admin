<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { File, Folder, LayoutDashboard, Menu, Settings, Shield, Users } from "@lucide/vue";

const props = defineProps<{
  name?: string;
  directory?: boolean;
}>();

const icons: Record<string, Component> = {
  "ant-design:dashboard-outlined": LayoutDashboard,
  "ant-design:user-outlined": Users,
  "ant-design:team-outlined": Users,
  "ant-design:safety-outlined": Shield,
  "ant-design:safety-certificate-outlined": Shield,
  "ant-design:menu-outlined": Menu,
  "ant-design:setting-outlined": Settings,
};

const icon = computed(() => {
  if (props.name && icons[props.name]) return icons[props.name];
  return props.directory ? Folder : File;
});
</script>

<template>
  <component :is="icon" class="size-4 shrink-0" />
</template>
