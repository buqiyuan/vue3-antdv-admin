<template>
  <icon-font :type="item?.meta?.icon" />
  <TitleI18n :title="item?.meta?.title" />
</template>

<script lang="ts" setup>
  import type { RouteRecordRaw } from 'vue-router';
  import { IconFont } from '@/components/basic/iconfont';
  import { TitleI18n } from '@/components/basic/title-i18n';

  defineOptions({
    name: 'MenuItemContent',
  });

  defineProps({
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
  });
</script>
