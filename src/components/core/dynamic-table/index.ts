import { Ref } from 'vue';
import DynamicTable from './src/dynamic-table.vue';
import type { DynamicTableInstance } from './src/dynamic-table';
export { DynamicTable };

export * from './types/';
export * from './src/hooks/';
export * from './src/dynamic-table';

export type DynamicTableRef = Ref<DynamicTableInstance>;
