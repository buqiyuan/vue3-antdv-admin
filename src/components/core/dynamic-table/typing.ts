import type { TableColumnType, TableProps } from 'ant-design-vue';
import type { VNode } from 'vue';
import type { FormItemSchema } from '../schema-form/types/form';
import type { ActionItem } from './types/tableAction';
import type { TableProps as DynamicTableProps } from './props';

/**
 * 加载表格数据的参数
 */
export interface LoadDataParams {
  /** 根据自己业务需求定义页码 */
  page?: number;
  /** 根据自己业务需求定义页数据条数 */
  limit?: number;
}

export type ColumnParams<T = any> = {
  record: T;
  text: string;
  index: number;
  column: TableColumnType;
};

/** 表格onChange事件回调参数 */
export type OnChangeCallbackParams = TableProps['onChange'];

/**
 * 表格属性
 */
export interface TableColumn<T = Indexable> extends Omit<TableColumnType, 'dataIndex' | 'key'> {
  title: string;
  dataIndex: keyof T | '$action';
  key?: keyof T | '$action';
  width?: number;
  /** 指定搜索的字段 */
  searchField?: string;
  /** 在查询表单中不展示此项 */
  hideInSearch?: boolean;
  /** 在 Table 中不展示此列 */
  hideInTable?: boolean;
  /** 传递给 Form.Item 的配置,可以配置 rules */
  formItemProps?: Partial<FormItemSchema<T>>;
  bodyCell?: (params: ColumnParams<T>) => VNode;
  headerCell?: (params: ColumnParams<T>) => VNode;
  actions?: (params: ColumnParams<T>) => ActionItem[];
}

/**
 * 表格实例
 */
export type DynamicTableInstance = {
  [P in keyof DynamicTableProps]: DynamicTableProps[P];
} & {
  tableData: any[];
  setProps(props: Partial<DynamicTableProps>): () => any;
  getProps: DynamicTableProps;
  refreshTable: (...rest: any[]) => any;
  getColumnKey: (column: TableColumn) => string | undefined;
};
