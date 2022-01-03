import { provide, inject, ComponentInternalInstance } from 'vue';
import type { TableProps } from '../props';

type DynamicTableInstance = {
  [P in keyof TableProps]: TableProps[P];
} & {
  setProps(props: Partial<TableProps>): () => any;
  getProps: TableProps;
  refreshTable: (...rest: any[]) => any;
};

const key = Symbol('dynamic-table');

export function createTableContext(instance: ComponentInternalInstance) {
  provide(key, instance.proxy);
}

export function useTableContext() {
  return inject(key) as DynamicTableInstance;
}
