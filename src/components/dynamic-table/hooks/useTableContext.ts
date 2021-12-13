import DynamicTable from '../dynamic-table.vue';
import { provide, inject, ComponentInternalInstance } from 'vue';

const key = Symbol('dynamic-table');

export type TableInstance = InstanceType<typeof DynamicTable>;

export function createTableContext(instance: ComponentInternalInstance) {
  provide(key, instance.proxy);
}

export function useTableContext(): TableInstance {
  return inject(key) as TableInstance;
}
