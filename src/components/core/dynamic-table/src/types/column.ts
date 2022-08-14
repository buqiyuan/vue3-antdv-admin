import type { TableColumnType } from 'ant-design-vue';
import type { FormSchema } from '@/components/core/schema-form';
import type { ActionItem } from './tableAction';
import type { TableActionType } from '@/components/core/dynamic-table/src/types';

export type CustomRenderParams<T = any> = Parameters<
  NonNullable<TableColumnType<T>['customRender']>
>[number];

export type EditableConfig<T = any> = {
  /** 可编辑表格的类型，`单行编辑` | `多行编辑` | `可编辑单元格` */
  type: 'single' | 'multiple' | 'cell';
  /** 传递给 Form.Item 的配置,可以配置 rules */
  formProps?: Partial<FormSchema<T>>;
  /** 行保存的时候 */
  onSave?: (
    /** 行 id，一般是唯一id */
    key: Key,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: T,
    /** 原始值，可以用于判断是否修改 */
    originRow: T,
  ) => Promise<any | void>;
};

/**
 * 表格属性
 */
export interface TableColumn<T = Indexable> extends Omit<TableColumnType<T>, 'dataIndex'> {
  dataIndex?: keyof T | ColumnKeyFlagType | 'INDEX';
  /** 指定搜索的字段 */
  searchField?: string;
  /** 在查询表单中不展示此项 */
  hideInSearch?: boolean;
  /** 在 Table 中不展示此列 */
  hideInTable?: boolean;
  /** 传递给搜索表单 Form.Item 的配置,可以配置 rules */
  formItemProps?: Partial<FormSchema<T>>;
  /** 传递给可编辑表格 Form.Item 的配置,可以配置 rules */
  editFormItemProps?: Partial<FormSchema<T>> & {
    /**
     * 是否继承于搜索表单`TableColumn.formItemProps`的所有属性,
     * 值为`true`时的行为伪代码如下：
     * ```js
     * Object.assign({}, TableColumn.formItemProps, EditableConfig.formProps)
     * ```
     * @defaultValue 默认值为`true`
     * */
    extendSearchFormProps?: boolean;
  };
  /** 操作列，一般用于对表格某一行数据进行操作 */
  actions?: (params: CustomRenderParams<T>, action: TableActionType) => ActionItem[];
  /** 当前单元格是否允许被编辑 */
  editable?: boolean | ((params: CustomRenderParams<T>) => boolean);
}

export enum ColumnKeyFlag {
  ACTION = 'ACTION',
  INDEX = 'INDEX',
}
export type ColumnKeyFlagType = keyof typeof ColumnKeyFlag;
