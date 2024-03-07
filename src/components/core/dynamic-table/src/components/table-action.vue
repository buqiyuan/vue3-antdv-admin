<template>
  <template v-for="(actionItem, index) in getActions" :key="`${index}-${actionItem.label}`">
    <ActionItemRender v-bind="actionItem">
      <a-button
        type="link"
        size="small"
        :loading="loadingMap.get(getKey(actionItem, index))"
        v-bind="actionItem"
      >
        {{ actionItem.label }}
      </a-button>
    </ActionItemRender>
    <a-divider v-if="divider && index < getActions.length - 1" type="vertical" />
  </template>
</template>

<script lang="tsx" setup>
  import { computed, ref, h, type FunctionalComponent } from 'vue';
  import { isFunction, isObject, isString } from 'lodash-es';
  import { Popconfirm, Tooltip, type TooltipProps } from 'ant-design-vue';
  import type { ActionItem } from '../types/tableAction';
  import type { CustomRenderParams } from '../types/column';
  import { hasPermission } from '@/permission';
  import { Icon } from '@/components/basic/icon';
  import { isPromise } from '@/utils/is';

  const ActionItemRender: FunctionalComponent<ActionItem> = (action, { slots }) => {
    const { popConfirm, tooltip } = action;
    const PopconfirmRender = () => {
      if (popConfirm) {
        return h(Popconfirm, popConfirm, { default: slots.default });
      }
      return slots.default?.();
    };

    if (tooltip) {
      return h(Tooltip, getTooltip(tooltip), { default: PopconfirmRender });
    }
    return PopconfirmRender();
  };

  const props = defineProps({
    actions: {
      // 表格行动作
      type: Array as PropType<ActionItem[]>,
      default: () => [],
    },
    columnParams: {
      type: Object as PropType<CustomRenderParams>,
      default: () => ({}),
    },
    divider: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    rowKey: [String, Number] as PropType<Key>,
  });

  const clickFnFlag = '__TABLE_ACTION';
  const loadingMap = ref(new Map<string, boolean>());

  const getActions = computed(() => {
    return props.actions
      .filter((item) => {
        const auth = item.auth;

        if (Object.is(auth, undefined)) {
          return true;
        }
        if (isString(auth)) {
          const isValid = hasPermission(auth);
          item.disabled ??= !isValid;
          if (item.disabled && !isValid) {
            item.title = '对不起，您没有该操作权限！';
          }
          return isValid;
        }
        if (isObject(auth)) {
          const isValid = hasPermission(auth.perm);
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

        if (isFunction(onClick) && !hasClickFnFlag(onClick)) {
          item.onClick = async () => {
            const callbackRes = onClick(props.columnParams);

            if (isPromise(callbackRes)) {
              const key = getKey(item, index);
              loadingMap.value.set(key, true);
              await callbackRes.finally(() => {
                loadingMap.value.delete(key);
              });
            }
          };
          setClickFnFlag(item.onClick);
        }
        if (item.icon) {
          item.icon = <Icon icon={item.icon} class={{ 'mr-1': !!item.label }} />;
        }
        return item;
      });
  });

  const hasClickFnFlag = (clickFn: Function) => {
    return Reflect.get(clickFn, clickFnFlag);
  };

  const setClickFnFlag = (clickFn: Function) => {
    Reflect.set(clickFn, clickFnFlag, true);
  };

  const getKey = (actionItem: ActionItem, index: number) => {
    return `${props.rowKey}${index}${actionItem.label}`;
  };

  const getTooltip = (data: ActionItem['tooltip']): TooltipProps => {
    return {
      getPopupContainer: () => document.body,
      placement: 'bottom',
      ...(isString(data) ? { title: data } : data),
    };
  };
</script>
