import DynamicTable from './src/dynamic-table.vue';
import type { DefineComponent, Ref } from 'vue';
import type { DynamicTableInstance, DynamicTableProps } from './src/dynamic-table';
export { DynamicTable };

export * from './src/types/';
export * from './src/hooks/';
export * from './src/dynamic-table';

export type DynamicTableRef = Ref<DynamicTableInstance>;

// TODO 暂时是为了解决ts error(如果你有解决方法 请务必联系我~): JSX element type 'DynamicTable' does not have any construct or call signatures.
export default DynamicTable as unknown as DefineComponent<Partial<DynamicTableProps>>;
