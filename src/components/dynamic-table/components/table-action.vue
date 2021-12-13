<template>
  <template v-for="(actionItem, index) in actions" :key="`${index}-${actionItem.label}`">
    <component
      :title="actionItem.title"
      :is="actionItem.popConfirm ? Popconfirm : 'span'"
      ok-text="确认"
      cancel-text="取消"
      v-bind="actionItem.popConfirm"
    >
      <a-button type="link" v-bind="actionItem">{{ actionItem.label }}</a-button>
    </component>
  </template>
</template>

<script lang="ts" setup>
  import { Popconfirm } from 'ant-design-vue';
  import { PropType } from 'vue';
  import type { ActionItem } from '../types/tableAction';

  defineProps({
    actions: {
      // 表格行动作
      type: Array as PropType<ActionItem[]>,
      default: () => [],
    },
  });
</script>
