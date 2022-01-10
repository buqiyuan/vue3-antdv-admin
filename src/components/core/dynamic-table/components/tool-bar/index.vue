<template>
  <div class="flex justify-between p-y-16px">
    <slot name="headerTitle">
      <div class="title">
        {{ title }}
        <BasicHelp v-if="titleTooltip" class="ml-6px pt-3px" :text="titleTooltip" />
      </div>
    </slot>

    <div>
      <slot name="toolbar"></slot>
      <slot></slot>
      <Divider type="vertical" v-if="$slots.toolbar && showTableSetting" />
      <TableSetting v-if="showTableSetting" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Divider } from 'ant-design-vue';
  import BasicHelp from '@/components/basic/basic-help/index.vue';
  import TableSetting from '../table-settings/index.vue';

  defineProps({
    title: {
      type: String,
      default: '',
    },
    titleTooltip: {
      type: String,
      default: '',
    },
    showTableSetting: {
      type: Boolean,
      default: true,
    },
  });
</script>

<style lang="less" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
  }
</style>
