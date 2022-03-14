import { isEmpty } from 'lodash-es';
import type { DynamicTableType } from './index';
import { exportJson2Excel } from '@/utils/Export2Excel';

/**
 * 导出表格Excel
 */
export const useExportData2Excel = (tableInstance: DynamicTableType) => {
  const exportData2Excel = () => {
    const { columns, getColumnKey, tableData } = tableInstance;

    const theaders = columns.filter((n) => getColumnKey(n) && getColumnKey(n) !== '$action');

    if (tableInstance.exportFormatter) {
      const { header, data } = tableInstance.exportFormatter(theaders, tableData.value);
      if (isEmpty(header) || isEmpty(data)) {
        return;
      } else {
        exportJson2Excel({
          header,
          data,
          filename: tableInstance.exportFileName,
          bookType: tableInstance.exportBookType,
          autoWidth: tableInstance.exportAutoWidth,
        });
      }
    } else {
      exportJson2Excel({
        header: theaders.map((n) => n.title),
        data: tableData.value.map((v) => theaders.map((header) => v[getColumnKey(header)!])),
        filename: tableInstance.exportFileName,
        bookType: tableInstance.exportBookType,
        autoWidth: tableInstance.exportAutoWidth,
      });
    }
  };
  return { exportData2Excel };
};
