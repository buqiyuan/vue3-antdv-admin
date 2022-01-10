<template>
  <template v-for="(actionItem, index) in actionFilters" :key="`${index}-${actionItem.label}`">
    <component
      :title="actionItem.title"
      :is="actionItem.popConfirm ? Popconfirm : 'span'"
      v-bind="actionItem.popConfirm"
    >
      <a-button type="link" v-bind="actionItem">{{ actionItem.label }}</a-button>
    </component>
  </template>
</template>

<script lang="ts" setup>
  import { Popconfirm } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import type { ActionItem } from '../types/tableAction';
  import { verifyAuth } from '@/core/permission/';
  import { isString, isObject } from '@/utils/is';

  const props = defineProps({
    actions: {
      // 表格行动作
      type: Array as PropType<ActionItem[]>,
      default: () => [],
    },
  });

  const actionFilters = computed(() => {
    return props.actions.filter((item) => {
      const auth = item.auth;

      if (Object.is(auth, undefined)) {
        return true;
      }
      if (isString(auth)) {
        const isValid = verifyAuth(auth);
        item.disabled ??= !isValid;
        if (item.disabled && !isValid) {
          item.title = '对不起，您没有该操作权限！';
        }
        return isValid;
      }
      if (isObject(auth)) {
        const isValid = verifyAuth(auth.perm);
        const isDisable = auth.effect !== 'delete';
        item.disabled ??= !isValid && isDisable;
        if (item.disabled && !isValid) {
          item.title = '对不起，您没有该操作权限！';
        }
        return isValid || isDisable;
      }
    });
  });
</script>
