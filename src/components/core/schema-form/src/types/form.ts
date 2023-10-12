import type { RowProps } from 'ant-design-vue';
import type { NamePath, RuleObject } from 'ant-design-vue/es/form/interface';
import type { FormItemProps } from 'ant-design-vue/es/form/FormItem';
import type { Component, VNode } from 'vue';
import type { ButtonProps as AntdButtonProps } from '@/components/basic/button';
import type { ColEx, ComponentMapType, ComponentProps } from './component';
// import type { TableActionType } from '/@/components/Table/src/types/table'
import type { SchemaFormInstance } from '../schema-form';
import type { SchemaFormType } from '../hooks';
import type { TableActionType } from '@/components/core/dynamic-table';

export type { RowProps };

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

/** 获取所有字段名 */
export type GetFieldKeys<T> = Exclude<keyof T, symbol | number>;

export interface RenderCallbackParams<T = string> {
  schema: FormSchema<T>;
  formModel: T extends string ? Recordable : Record<GetFieldKeys<T>, any>;
  field: T extends string ? string : GetFieldKeys<T>;
  values: any;
  /** 动态表单实例 */
  formInstance: SchemaFormType;
  /** 动态表格实例 */
  tableInstance?: TableActionType;
  /** 动态表格rowKey */
  tableRowKey?: Key;
  /** 作用域插槽数据 */
  slotData?: Recordable;
}
/** 自定义VNode渲染器 */
export type CustomRenderFn<T = any> = (
  renderCallbackParams: RenderCallbackParams<T>,
) => VNode | VNode[] | string;

export interface ButtonProps extends AntdButtonProps {
  text?: string;
}

export interface FormActionType {
  formModel?: Recordable;
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => any;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setSchemaFormProps: (formProps: Partial<FormSchema>) => Promise<void>;
  removeSchemaByField: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}

export type RegisterFn = (formInstance: SchemaFormInstance) => void;

/** 表单项 */
export interface FormSchema<T = string> {
  /** 字段名 */
  field: T extends string ? string : GetFieldKeys<T>;
  // Event name triggered by internal value change, default change
  changeEvent?: string;
  // Variable name bound to v-model Default value
  valueField?: string;
  // Label name
  label?: string | ((v: RenderCallbackParams<T>) => string);
  // Auxiliary text
  subLabel?: string;
  // Help text on the right side of the text
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams<T>) => string | string[]);
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>;
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number;
  // Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
  disabledLabelWidth?: boolean;
  /** 表单项对应的组件，eg: Input */
  component?: ComponentMapType | CustomRenderFn<T> | ((opt: RenderCallbackParams<T>) => Component);
  /** 表单组件属性 */
  componentProps?:
    | ComponentProps
    | {
        (opt: RenderCallbackParams<T>): ComponentProps;
        requestResult: ComponentProps['requestResult'];
      };
  /** 表单组件slots，例如 a-input 的 suffix slot 可以写成：{ suffix: () => VNode } */
  componentSlots?:
    | ((renderCallbackParams: RenderCallbackParams<T>) => Recordable<CustomRenderFn<T>>)
    | Recordable<CustomRenderFn<T>>
    | ReturnType<CustomRenderFn>;
  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  suffix?: string | number | ((values: RenderCallbackParams<T>) => string | number);

  // Validation rules
  rules?: Rule[];
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;
  /** 组件加载状态 */
  loading?: boolean;

  // Reference formModelItem
  formItemProps?: Partial<FormItemProps>;

  // col configuration outside formModelItem
  colProps?: Partial<ColEx>;

  /** 搜索表单项排序 */
  order?: number;
  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  // Matching details components
  span?: number;
  /** 作用同v-show */
  vShow?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);
  /** 作用同v-if */
  vIf?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  // 渲染col内容需要外层包装form-item
  renderColContent?: CustomRenderFn<T>;

  // Custom slot, in from-item
  slot?: string;

  // 自定义槽，类似renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams<T>) => Rule[];
}
export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // colour
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}
