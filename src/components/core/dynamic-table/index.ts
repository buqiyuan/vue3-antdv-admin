import { Ref } from 'vue';
import DynamicTable from './src/dynamic-table.vue';
import type { DynamicTableInstance } from './src/dynamic-table';
export { DynamicTable };

export * from './src/types/';
export * from './src/hooks/';
export * from './src/dynamic-table';
export * from './src/components/';

export type DynamicTableRef = Ref<DynamicTableInstance>;
