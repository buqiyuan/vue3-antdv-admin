import { isEmpty } from 'lodash-es';
import { export_json_to_excel } from '@/utils/Export2Excel';
import { type DynamicTableInstance } from '../typing';
import { type ComponentInternalInstance } from 'vue';

/**
 * 导出表格Excel
 */
export const useExportData2Excel = (_tableInstance: ComponentInternalInstance) => {
  const tableInstance = _tableInstance.proxy as unknown as DynamicTableInstance;

  const exportData2Excel = () => {
    const { columns, getColumnKey, tableData } = tableInstance;

    const theaders = columns.filter((n) => getColumnKey(n) && getColumnKey(n) !== '$action');

    if (tableInstance.exportFormatter) {
      const { header, data } = tableInstance.exportFormatter(theaders, tableData);
      if (isEmpty(header) || isEmpty(data)) {
        return;
      } else {
        export_json_to_excel({
          header,
          data,
          filename: tableInstance.exportFileName,
          bookType: tableInstance.exportBookType,
          autoWidth: tableInstance.exportAutoWidth,
        });
      }
    } else {
      export_json_to_excel({
        header: theaders.map((n) => n.title),
        data: tableData.map((v) => theaders.map((header) => v[getColumnKey(header)!])),
        filename: tableInstance.exportFileName,
        bookType: tableInstance.exportBookType,
        autoWidth: tableInstance.exportAutoWidth,
      });
    }
  };
  return { exportData2Excel };
};
