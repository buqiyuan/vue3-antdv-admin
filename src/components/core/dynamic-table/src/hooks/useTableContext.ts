import { injectLocal, provideLocal } from '@vueuse/core';
import type { Ref } from 'vue';
import type { TableMethods } from './useTableMethods';
import type { TableState } from './useTableState';
import type { TableForm } from './useTableForm';
import type { UseEditableType } from './useEditable';
import type { ExportData2Excel } from './useExportData2Excel';
import type { DynamicTableProps } from '../dynamic-table';
import type { TableColumn } from '../types/column';

type DynamicTableType = {
  tableProps: DynamicTableProps;
  innerColumns: Ref<TableColumn[]>;
} & TableMethods &
  TableState &
  TableForm &
  UseEditableType &
  ExportData2Excel;

const key = Symbol('dynamic-table');

export function createTableContext(instance: DynamicTableType) {
  provideLocal(key, instance);
}

export function useTableContext() {
  return injectLocal(key) as DynamicTableType;
}
