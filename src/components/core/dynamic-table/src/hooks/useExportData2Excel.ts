import { isEmpty } from 'lodash-es';
import { DynamicTableProps } from '../dynamic-table';
import type { TableMethods, TableState } from './index';
import { exportJson2Excel } from '@/utils/Export2Excel';

export type UseExportData2ExcelContext = {
  state: TableState;
  methods: TableMethods;
  props: DynamicTableProps;
};

/**
 * 导出表格Excel
 */
export const useExportData2Excel = ({ props, state, methods }: UseExportData2ExcelContext) => {
  const exportData2Excel = () => {
    const { columns, exportFormatter, exportFileName, exportBookType, exportAutoWidth } = props;
    const { getColumnKey } = methods;
    const { tableData } = state;

    const theaders = columns.filter((n) => getColumnKey(n) && getColumnKey(n) !== '$action');

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
        header: theaders.map((n) => n.title),
        data: tableData.value.map((v) => theaders.map((header) => v[getColumnKey(header)!])),
        filename: exportFileName,
        bookType: exportBookType,
        autoWidth: exportAutoWidth,
      });
    }
  };
  return { exportData2Excel };
};
