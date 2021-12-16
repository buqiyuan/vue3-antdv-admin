import { DynamicTableInstance } from '../';
import { provide, inject, ComponentInternalInstance } from 'vue';

const key = Symbol('dynamic-table');

export function createTableContext(instance: ComponentInternalInstance) {
  provide(key, instance.proxy);
}

export function useTableContext(): DynamicTableInstance {
  return inject(key) as DynamicTableInstance;
}
