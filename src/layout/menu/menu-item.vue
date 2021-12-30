<template>
  <template v-if="!props.menuInfo?.meta?.hideInMenu">
    <!-- 目录 -->
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
        <!-- 递归生成菜单 -->
        <MyMenuItem :menuInfo="item" />
      </template>
    </Menu.SubMenu>
    <!-- 菜单 -->
    <template v-else>
      <Menu.Item :key="props.menuInfo?.name">
        <icon-font :type="props.menuInfo?.meta?.icon" />
        <span>{{ getTitle(props.menuInfo?.meta?.title) }}</span>
      </Menu.Item>
    </template>
  </template>
</template>

<script lang="ts">
  export default {
    name: 'MyMenuItem',
  };
</script>

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
