<template>
  <template v-if="!props.menuInfo?.meta?.hideInMenu">
    <Menu.SubMenu
      v-if="props.menuInfo?.children?.length"
      :key="props.menuInfo?.name"
      v-bind="$attrs"
    >
      <template #title>
        <span>
          <icon-font :type="props.menuInfo.meta?.icon" />
          <span>{{ getTitle(props.menuInfo.meta?.title) }}</span>
        </span>
      </template>
      <template v-for="item in props.menuInfo?.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <icon-font :type="item.meta?.icon" />
            <span>{{ getTitle(item.meta?.title) }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item :key="item.name" :menu-info="item" />
        </template>
      </template>
    </Menu.SubMenu>
    <template v-else>
      <Menu.Item :key="props.menuInfo?.name">
        <icon-font :type="props.menuInfo?.meta?.icon" />
        <span>{{ getTitle(props.menuInfo?.meta?.title) }}</span>
      </Menu.Item>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { Menu } from 'ant-design-vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { IconFont } from '@/components/iconfont';

  const props = defineProps({
    menuInfo: {
      type: Object as PropType<RouteRecordRaw>,
    },
  });
  const getTitle = (title) => {
    return typeof title === 'string' ? title : title?.['zh_CN'];
  };
</script>

<style scoped></style>
