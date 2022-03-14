import { provide, inject } from 'vue';
import type { DynamicTableType } from './index';

const key = Symbol('dynamic-table');

export function createTableContext(instance: DynamicTableType) {
  provide(key, instance);
}

export function useTableContext() {
  return inject(key) as DynamicTableType;
}
