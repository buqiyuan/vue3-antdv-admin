<template>
  <template v-for="item in filterMenus" :key="item.name || item.fullPath">
    <!-- 目录 -->
    <template v-if="isShowSubMenu(item)">
      <Menu.SubMenu :key="item?.name" v-bind="$attrs">
        <template #title>
          <MenuItemContent :item="item" />
        </template>
        <template v-if="item.children">
          <!-- 递归生成菜单 -->
          <MyMenuItem :menus="item.children" />
        </template>
      </Menu.SubMenu>
    </template>
    <!-- 菜单 -->
    <template v-else>
      <Menu.Item :key="item?.name" @click="handleMenuItemClick(item)">
        <MenuItemContent :item="item" />
      </Menu.Item>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { type PropType, computed } from 'vue';
  import { Menu } from 'ant-design-vue';
  import MenuItemContent from './menu-item-content.vue';
  import type { RouteRecordRaw } from 'vue-router';

  defineOptions({
    name: 'MyMenuItem',
  });

  const props = defineProps({
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
  });

  const filterMenus = computed(() => {
    return [...props.menus]
      .filter((n) => !n.meta?.hideInMenu)
      .sort((a, b) => ~~a.meta?.orderNo! - ~~b.meta?.orderNo!);
  });

  const isShowSubMenu = (menuItem: RouteRecordRaw) => {
    return (
      menuItem?.meta?.type === 0 ||
      (!Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length)
    );
  };

  const handleMenuItemClick = (item: RouteRecordRaw) => {
    const { isExt, extOpenMode } = item.meta || {};
    if (isExt && extOpenMode !== 2) {
      window.open(item.path);
    }
  };
</script>

<style scoped></style>
