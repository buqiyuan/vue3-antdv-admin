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
          <TitleI18n :title="props.menuInfo?.meta?.title" />
        </span>
      </template>
      <template v-for="item in menuChildren" :key="item.name">
        <!-- 递归生成菜单 -->
        <MyMenuItem :menu-info="item" />
      </template>
    </Menu.SubMenu>
    <!-- 菜单 -->
    <template v-else>
      <Menu.Item :key="props.menuInfo?.name">
        <icon-font :type="props.menuInfo?.meta?.icon" />
        <TitleI18n :title="props.menuInfo?.meta?.title" />
      </Menu.Item>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { type PropType, computed } from 'vue';
  import { Menu } from 'ant-design-vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { IconFont } from '@/components/basic/iconfont';
  import { TitleI18n } from '@/components/basic/title-i18n';

  defineOptions({
    name: 'MyMenuItem',
  });

  const props = defineProps({
    menuInfo: {
      type: Object as PropType<RouteRecordRaw>,
    },
  });

  const menuChildren = computed(() =>
    [...(props.menuInfo?.children || [])].sort(
      (a, b) => (a?.meta?.orderNum || 0) - (b?.meta?.orderNum || 0),
    ),
  );
</script>

<style scoped></style>
