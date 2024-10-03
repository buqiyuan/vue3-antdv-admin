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

/** 编辑行类型 */
export type EditableType = 'single' | 'multiple' | 'cell';

/** 单元格保存回调 */
export type OnSave<T = any> = (
  /** 行 id，一般是唯一id */
  key: Key,
  /** 当前修改的行的值，只有 form 在内的会被设置 */
  record: T,
  /** 原始值，可以用于判断是否修改 */
  originRow: T,
) => Promise<any | void>;

/** 单元格取消保存回调 */
export type OnCancel<T = any> = (
  /** 行 id，一般是唯一id */
  key: Key,
  /** 当前修改的行的值，只有 form 在内的会被设置 */
  record: T,
  /** 原始值，可以用于判断是否修改 */
  originRow: T,
) => any | void;
