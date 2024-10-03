import { injectLocal, provideLocal } from '@vueuse/core';
import type {
  TableMethods,
  TableState,
  TableForm,
  UseEditableType,
  ExportData2Excel,
  UseColumnsType,
} from './';
import type { DynamicTableProps } from '../dynamic-table';

type DynamicTableType = {
  tableProps: DynamicTableProps;
} & TableMethods &
  TableState &
  TableForm &
  UseEditableType &
  UseEditableType &
  ExportData2Excel &
  UseColumnsType;

const key = Symbol('dynamic-table');

export function createTableContext(instance: DynamicTableType) {
  provideLocal(key, instance);
}

export function useTableContext() {
  return injectLocal(key) as DynamicTableType;
}
