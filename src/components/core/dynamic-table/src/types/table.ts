import type { TableProps } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue/es/table';

/**
 * 加载表格数据的参数
 */
export type LoadDataParams = TablePaginationConfig & {
  /** 根据自己业务需求定义页码 */
  page?: number;
  /** 根据自己业务需求定义页数据条数 */
  limit?: number;
};

/** 表格onChange事件回调参数 */
export type OnChangeCallbackParams = Parameters<NonNullable<TableProps['onChange']>>;

/** 表格onChange事件回调函数 */
export type OnChangeCallback = TableProps['onChange'];
