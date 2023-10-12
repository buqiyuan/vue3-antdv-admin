import DynamicTable from './src/dynamic-table.vue';
import type { Ref } from 'vue';
import type { DynamicTableInstance } from './src/dynamic-table';
export { DynamicTable };

export * from './src/types/';
export * from './src/hooks/';
export * from './src/dynamic-table';

export type DynamicTableRef = Ref<DynamicTableInstance>;

export default DynamicTable;
