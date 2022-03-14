import { unref, computed } from 'vue';
import type { ComputedRef, Slots, Ref } from 'vue';
import type { DynamicTableProps } from '../dynamic-table';
import type { FormSchema, SchemaFormProps } from '@/components/core/schema-form';

export function useTableForm(
  propsRef: ComputedRef<DynamicTableProps>,
  slots: Slots,
  getColumnKey: (...rest) => any,
  loadingRef: Ref<boolean>,
) {
  const getFormProps = computed((): SchemaFormProps => {
    const { formProps } = unref(propsRef);
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
    return unref(propsRef)
      .columns.filter((n) => {
        const field = getColumnKey(n);
        return !n.hideInSearch && !!field && field !== '$action';
      })
      .map((n) => {
        return {
          field: n.formItemProps?.field ?? n.searchField ?? getColumnKey(n),
          component: 'Input',
          label: n.title,
          colProps: {
            span: 8,
          },
          ...n.formItemProps,
        };
      });
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
