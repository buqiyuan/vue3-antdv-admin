import { unref, computed, watchEffect } from 'vue';
import type { TableMethods } from './useTableMethods';
import type { TableState } from './useTableState';
import type { ComputedRef, Slots } from 'vue';
import type { FormSchema, SchemaFormProps } from '@/components/core/schema-form';

export type UseTableFormContext = {
  tableState: TableState;
  tableMethods: TableMethods;
  slots: Slots;
};

export function useTableForm({ tableState, slots, tableMethods }: UseTableFormContext) {
  const { getProps, loadingRef } = tableState;
  const { getColumnKey, getQueryFormRef } = tableMethods;

  const getFormProps = computed((): SchemaFormProps => {
    const { formProps } = unref(getProps);
    const { submitButtonOptions } = formProps || {};
    return {
      showAdvancedButton: true,
      layout: 'horizontal',
      labelWidth: 100,
      ...formProps,
      schemas: formProps.schemas ?? unref(formSchemas),
      submitButtonOptions: { loading: unref(loadingRef), ...submitButtonOptions },
      compact: true,
    };
  });

  const formSchemas = computed<FormSchema[]>(() => {
    return unref(getProps)
      .columns.filter((n) => {
        const field = getColumnKey(n);
        return !n.hideInSearch && !!field && field !== '$action';
      })
      .map((n) => {
        return {
          field: n.formItemProps?.field ?? n.searchField ?? (getColumnKey(n) as string),
          component: 'Input',
          label: n.title,
          colProps: {
            span: 8,
          },
          ...n.formItemProps,
        };
      });
  });

  // 同步外部对props的修改
  watchEffect(() => getQueryFormRef()?.setSchemaFormProps(unref(getFormProps)), {
    flush: 'post',
  });

  const getFormSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots);
    return keys
      .map((item) => (item.startsWith('form-') ? item : null))
      .filter((item): item is string => !!item);
  });

  function replaceFormSlotKey(key: string) {
    if (!key) return '';
    return key?.replace?.(/form-/, '') ?? '';
  }

  return {
    getFormProps,
    replaceFormSlotKey,
    getFormSlotKeys,
  };
}
