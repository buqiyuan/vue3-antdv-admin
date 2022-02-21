import type { DynamicTableInstance } from './../typing';
import { provide, inject, type ComponentInternalInstance } from 'vue';

const key = Symbol('dynamic-table');

export function createTableContext(instance: ComponentInternalInstance) {
  provide(key, instance.proxy);
}

export function useTableContext() {
  return inject(key) as DynamicTableInstance;
}
