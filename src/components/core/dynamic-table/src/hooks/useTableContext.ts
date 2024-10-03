import { injectLocal, provideLocal } from '@vueuse/core';
import type { TableMethods, TableState, TableForm, UseEditableType } from './';
import type { DynamicTableProps } from '../dynamic-table';

type DynamicTableType = { props: DynamicTableProps } & TableMethods &
  TableState &
  TableForm &
  UseEditableType &
  UseEditableType;

const key = Symbol('dynamic-table');

export function createTableContext(instance) {
  provideLocal(key, instance);
}

export function useTableContext() {
  return injectLocal(key) as DynamicTableType;
}
