<template>
  <Menu.Item :key="item?.name" @click="handleMenuItemClick(item)">
    <MenuItemContent :item="item" />
  </Menu.Item>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { Menu } from 'ant-design-vue';
  import MenuItemContent from './menu-item-content.vue';
  import type { PropType } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';

  defineOptions({
    name: 'MyMenuItem',
  });

  defineProps({
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
  });

  const router = useRouter();

  const handleMenuItemClick = (item: RouteRecordRaw) => {
    const { isExt, extOpenMode } = item.meta || {};
    if (isExt && extOpenMode !== 2) {
      window.open(item.path);
    } else {
      router.push({ name: item.name });
    }
  };
</script>
