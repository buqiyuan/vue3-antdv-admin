import type { TableColumnType, TableProps } from 'ant-design-vue';
import type { VNode } from 'vue';
import type { FormItemSchema } from '../JSON-schema-form/types/form';
import type { ActionItem } from './types/tableAction';

/**
 * 加载表格数据的参数
 */
export interface LoadDataParams extends TableProps {
  /** 根据自己业务需求定义页码 */
  page?: number;
  /** 根据自己业务需求定义页数据条数 */
  limit?: number;
}

// export interface ActionOptions {
//   type: 'select' | 'button' | 'text' | 'popconfirm' // 控制类型，默认为a,可选： select | button | text
//   text: string
//   permission?: {
//     // 权限
//     action?: 'create' | 'delete' | 'update' | 'retrieve' // CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作
//     effect?: 'disabled'
//   }
//   props?: any // 组件属性，v-bind="props"
//   func?: ({ text, record, index }, callback: (...rest) => any) => any // 动作事件触发回调
// }

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
export interface TableColumn<T = any> extends TableColumnType {
  title: string;
  dataIndex: string | '$action';
  width?: number;
  /** 指定搜索的字段 */
  searchField?: string;
  /** 在查询表单中不展示此项 */
  hideInSearch?: boolean;
  /** 在 Table 中不展示此列 */
  hideInTable?: boolean;
  /** 传递给 Form.Item 的配置,可以配置 rules */
  formItemProps?: Partial<FormItemSchema>;
  bodyCell?: (params: ColumnParams<T>) => VNode;
  headerCell?: (params: ColumnParams<T>) => VNode;
  actions?: (params: ColumnParams<T>) => ActionItem[];
}

// export interface ActionItem {
//   type: 'popconfirm' | 'select' | 'button' | 'text' // 控制类型，默认为a,可选： select | button | text
//   text: string
//   permission: {
//     // 权限
//     action: 'delete'
//     effect: 'disabled'
//   }
//   props: ButtonProps | any
//   func: ({ record }, refreshTableData) => any
// }
