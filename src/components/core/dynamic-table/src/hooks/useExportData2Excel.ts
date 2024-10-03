import { get, isEmpty } from 'lodash-es';
import { columnKeyFlags } from '../types';
import type { TableState } from './useTableState';
import type { DynamicTableProps } from '../dynamic-table';
import type { TableMethods } from './useTableMethods';
import { exportJson2Excel } from '@/utils/Export2Excel';

export type ExportData2Excel = ReturnType<typeof useExportData2Excel>;

interface UseExportData2ExcelPayload {
  tableState: TableState;
  props: DynamicTableProps;
  tableMethods: TableMethods;
}

/**
 * 导出表格Excel
 */
export const useExportData2Excel = (payload: UseExportData2ExcelPayload) => {
  const { tableState, props, tableMethods } = payload;
  const { tableData } = tableState;
  const { getColumnKey } = tableMethods;

  const exportData2Excel = () => {
    const { columns, exportFormatter, exportFileName, exportBookType, exportAutoWidth } = props;

    const theaders = columns.filter((n) => {
      const key = getColumnKey(n);
      return key && !columnKeyFlags.includes(key);
    });

    if (exportFormatter) {
      const { header, data } = exportFormatter(theaders, tableData.value);
      if (isEmpty(header) || isEmpty(data)) {
        return;
      } else {
        exportJson2Excel({
          header,
          data,
          filename: exportFileName,
          bookType: exportBookType,
          autoWidth: exportAutoWidth,
        });
      }
    } else {
      exportJson2Excel({
        header: theaders.map((n) => n.title as string),
        data: tableData.value.map((v) => theaders.map((header) => get(v, getColumnKey(header)!))),
        filename: exportFileName,
        bookType: exportBookType,
        autoWidth: exportAutoWidth,
      });
    }
  };
  return { exportData2Excel };
};
