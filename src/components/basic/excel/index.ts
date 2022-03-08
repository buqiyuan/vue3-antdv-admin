import impExcel from './src/ImportExcel.vue';
import { withInstall } from '@/utils';
export { useExportExcelModal } from './src/ExportExcelModal';

export const ImpExcel = withInstall(impExcel);
// export const ExpExcelModal = withInstall(expExcelModal);
export * from './src/typing';
export * from './src/Export2Excel';
