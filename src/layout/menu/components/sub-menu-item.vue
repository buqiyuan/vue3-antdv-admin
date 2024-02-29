<template>
  <!-- 目录 -->
  <Menu.SubMenu v-if="isShowSubMenu(item)" :key="item?.name" v-bind="$attrs">
    <template #title>
      <MenuItemContent :item="item" />
    </template>
    <template v-for="child in item.children || []" :key="child.name">
      <MySubMenuItem :item="child" />
    </template>
  </Menu.SubMenu>
  <!-- 菜单 -->
  <MyMenuItem v-else :item="item" />
</template>

<script setup lang="ts">
  import { Menu } from 'ant-design-vue';
  import MyMenuItem from './menu-item.vue';
  import MenuItemContent from './menu-item-content.vue';
  import type { PropType } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';

  defineOptions({
    name: 'MySubMenuItem',
  });

  defineProps({
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
  });

  const isShowSubMenu = (menuItem: RouteRecordRaw) => {
    return (
      menuItem?.meta?.type === 0 ||
      (!Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length)
    );
  };
</script>

<style scoped></style>
