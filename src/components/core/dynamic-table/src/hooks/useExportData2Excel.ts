import { get, isEmpty } from 'lodash-es';
import { columnKeyFlags } from '../types';
import { useTableContext } from './useTableContext';
import { exportJson2Excel } from '@/utils/Export2Excel';

export type ExportData2Excel = ReturnType<typeof useExportData2Excel>;

/**
 * 导出表格Excel
 */
export const useExportData2Excel = () => {
  const exportData2Excel = () => {
    const tableContext = useTableContext();
    const { columns, exportFormatter, exportFileName, exportBookType, exportAutoWidth } =
      tableContext.props;
    const { tableData } = tableContext;

    const theaders = columns.filter((n) => {
      const key = tableContext.getColumnKey(n);
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
        data: tableData.value.map((v) =>
          theaders.map((header) => get(v, tableContext.getColumnKey(header)!)),
        ),
        filename: exportFileName,
        bookType: exportBookType,
        autoWidth: exportAutoWidth,
      });
    }
  };
  return { exportData2Excel };
};
