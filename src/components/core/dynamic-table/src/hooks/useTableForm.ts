import { unref, computed, watchEffect } from 'vue';
import { ColumnKeyFlag } from '../types/column';
import { useTableContext } from './useTableContext';
import type { ComputedRef } from 'vue';
import type { FormSchema, SchemaFormProps } from '@/components/core/schema-form';

export type TableForm = ReturnType<typeof useTableForm>;

export function useTableForm() {
  const { slots, getProps, loadingRef, getColumnKey, getSearchFormRef } = useTableContext();

  const getFormProps = computed((): SchemaFormProps => {
    const { formProps } = unref(getProps);
    const { submitButtonOptions } = formProps || {};
    // @ts-ignore
    return {
      showAdvancedButton: true,
      layout: 'horizontal',
      labelWidth: 100,
      schemas: unref(formSchemas),
      ...formProps,
      submitButtonOptions: { loading: unref(loadingRef), ...submitButtonOptions },
      compact: true,
    };
  });

  const formSchemas = computed<FormSchema[]>(() => {
    const columnKeyFlags = Object.keys(ColumnKeyFlag);
    return unref(getProps)
      .columns.filter((n) => {
        const field = getColumnKey(n);
        return !n.hideInSearch && !!field && !columnKeyFlags.includes(field as string);
      })
      .map((n) => {
        return {
          field: n.searchField ?? ([] as string[]).concat(getColumnKey(n)).join('.'),
          component: 'Input',
          label: n.title as string,
          colProps: {
            span: 8,
          },
          ...n.formItemProps,
        } as FormSchema;
      })
      .sort((a, b) => Number(a?.order) - Number(b?.order)) as FormSchema[];
  });

  // 同步外部对props的修改
  watchEffect(() => getSearchFormRef()?.setSchemaFormProps(unref(getFormProps)), {
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
