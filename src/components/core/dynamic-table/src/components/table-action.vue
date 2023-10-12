<template>
  <template v-for="(actionItem, index) in actionFilters" :key="`${index}-${actionItem.label}`">
    <component
      :is="actionItem.popConfirm ? 'a-popconfirm' : 'span'"
      :title="actionItem.title"
      v-bind="actionItem.popConfirm"
    >
      <a-button
        type="link"
        :loading="loadingMap.get(getKey(actionItem, index))"
        v-bind="actionItem"
      >
        {{ actionItem.label }}
      </a-button>
    </component>
  </template>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import type { ActionItem } from '../types/tableAction';
  import type { CustomRenderParams } from '../types/column';
  import { verifyAuth } from '@/core/permission/';
  import { isString, isObject, isAsyncFunction } from '@/utils/is';

  export default defineComponent({
    components: { [Popconfirm.name]: Popconfirm },
    props: {
      actions: {
        // 表格行动作
        type: Array as PropType<ActionItem[]>,
        default: () => [],
      },
      columnParams: {
        type: Object as PropType<CustomRenderParams>,
        default: () => ({}),
      },
      rowKey: [String, Number] as PropType<Key>,
    },
    setup(props) {
      const loadingMap = ref(new Map<string, boolean>());

      const actionFilters = computed(() => {
        return props.actions
          .filter((item) => {
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
          })
          .map((item, index) => {
            const onClick = item.onClick;

            if (isAsyncFunction(onClick)) {
              item.onClick = async () => {
                const key = getKey(item, index);
                loadingMap.value.set(key, true);
                await onClick(props.columnParams).finally(() => {
                  loadingMap.value.delete(key);
                });
              };
            }
            return item;
          });
      });

      const getKey = (actionItem: ActionItem, index: number) => {
        return `${props.rowKey}${index}${actionItem.label}`;
      };

      return {
        actionFilters,
        loadingMap,
        getKey,
      };
    },
  });
</script>
