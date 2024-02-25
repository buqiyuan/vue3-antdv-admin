import { get, isEmpty } from 'lodash-es';
import { columnKeyFlags } from '../types';
import type { DynamicTableProps } from '../dynamic-table';
import type { TableMethods, TableState } from './index';
import { exportJson2Excel } from '@/utils/Export2Excel';

export type UseExportData2ExcelContext = {
  state: TableState;
  methods: TableMethods;
  props: DynamicTableProps;
};

export type ExportData2Excel = ReturnType<typeof useExportData2Excel>;

/**
 * 导出表格Excel
 */
export const useExportData2Excel = ({ props, state, methods }: UseExportData2ExcelContext) => {
  const exportData2Excel = () => {
    const { columns, exportFormatter, exportFileName, exportBookType, exportAutoWidth } = props;
    const { getColumnKey } = methods;
    const { tableData } = state;

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
