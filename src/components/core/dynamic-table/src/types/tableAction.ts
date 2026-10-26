import type { DebouncedFunc } from 'lodash-es';

/**
 * 表格实例上操作列会用到的方法。
 * 签名与 `useTableMethods` / `useEditable` 的对应方法一致，但这里不引用 hooks，
 * 避免类型层通过 hooks barrel 把组件实现卷进环。
 */
export type TableActionType = {
  /** 刷新并清空,页码也会重置，不包括搜索表单 */
  reload: (resetPageIndex?: boolean) => Promise<unknown>;
  /** 设置动态表格属性 */
  setProps: (props: Recordable) => void;
  /** 获取远程数据 */
  fetchData: DebouncedFunc<(params?: Recordable) => Promise<unknown>>;
  /** 进入编辑状态 */
  startEditable: (recordKey: Key, currentRow?: Recordable) => boolean;
  /** 取消编辑 */
  cancelEditable: (recordKey: Key) => boolean;
  /** 获取编辑后表单的值 */
  getEditFormModel: (recordKey: Key) => any;
  /** 当前行是否处于编辑状态 */
  isEditable: (recordKey: Key) => boolean;
  /** 行编辑表单是否校验通过 */
  validateRow: (recordKey: Key) => Promise<any>;
};
