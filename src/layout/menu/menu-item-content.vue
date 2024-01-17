<template>
  <template v-if="item?.meta?.icon">
    <Icon :icon="item.meta.icon" />
  </template>
  <TitleI18n :title="item?.meta?.title" />
</template>

<script lang="ts" setup>
  import type { RouteRecordRaw } from 'vue-router';
  import { Icon } from '@/components/basic/icon';
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
