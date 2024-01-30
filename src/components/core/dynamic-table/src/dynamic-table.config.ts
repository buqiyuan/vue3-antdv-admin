import type { SorterResult } from 'ant-design-vue/es/table/interface';
import type { AlignType } from 'ant-design-vue/es/vc-table/interface';

/** 表格配置 */
export default {
  fetchConfig: {
    // The field name of the current page passed to the background
    pageField: 'page',
    // The number field name of each page displayed in the background
    sizeField: 'pageSize',
    // Field name of the form data returned by the interface
    listField: 'items',
    // Total number of tables returned by the interface field name
    totalField: 'meta.totalItems',
  },
  // Number of pages that can be selected
  pageSizeOptions: ['10', '50', '80', '100'],
  // Default display quantity on one page
  defaultPageSize: 10,
  // Default layout of table cells
  defaultAlign: 'center' as AlignType,
  // Custom general sort function
  defaultSortFn: (sortInfo: SorterResult) => {
    const { field, order } = sortInfo;
    if (field && order) {
      return {
        // The sort field passed to the backend you
        field,
        // Sorting method passed to the background asc/desc
        order,
      };
    } else {
      return {};
    }
  },
  // Custom general filter function
  defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
    return data;
  },
} as const;
