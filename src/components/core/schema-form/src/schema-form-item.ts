import type { TableActionType } from '@/components/core/dynamic-table';
import type { UnwrapFormSchema } from './types';

export const schemaFormItemProps = {
  formModel: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  schema: {
    type: Object as PropType<UnwrapFormSchema>,
    default: () => ({}),
  },
  // 动态表格实例
  tableInstance: {
    type: Object as PropType<TableActionType>,
  },
  // 动态表格rowKey
  tableRowKey: {
    type: [String, Number] as PropType<Key>,
  },
};

export type SchemaFormItemProps = typeof schemaFormItemProps;
