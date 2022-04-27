<template>
  <!-- 目录 -->
  <template v-if="isShowSubMenu">
    <Menu.SubMenu :key="props.menuInfo?.name" v-bind="$attrs">
      <template #title>
        <span>
          <icon-font :type="props.menuInfo.meta?.icon" />
          <TitleI18n :title="props.menuInfo?.meta?.title" />
        </span>
      </template>
      <template v-for="item in menuChildren" :key="item.name || item.fullPath">
        <!-- 递归生成菜单 -->
        <MyMenuItem :menu-info="item" />
      </template>
    </Menu.SubMenu>
  </template>
  <!-- 菜单 -->
  <template v-else>
    <Menu.Item :key="props.menuInfo?.name">
      <icon-font :type="props.menuInfo?.meta?.icon" />
      <TitleI18n :title="props.menuInfo?.meta?.title" />
    </Menu.Item>
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

  const menuChildren = computed(() => {
    return [...(props.menuInfo?.children || [])]
      .filter((n) => !n.meta?.hideInMenu)
      .sort((a, b) => (a?.meta?.orderNum || 0) - (b?.meta?.orderNum || 0));
  });

  const isShowSubMenu = computed(() => {
    const menuInfo = props.menuInfo;
    return (
      menuInfo?.meta?.type === 0 ||
      (!Object.is(menuInfo?.meta?.hideChildrenInMenu, true) && menuInfo?.children?.length)
    );
  });
</script>

<style scoped></style>
