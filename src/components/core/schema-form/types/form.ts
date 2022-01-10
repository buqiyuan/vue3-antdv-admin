import type { NamePath, RuleObject } from 'ant-design-vue/lib/form/interface';
import type { FormItemProps } from './formItem';
import type { Component, VNode } from 'vue';
// import type { ButtonProps as AntdButtonProps } from '/@/components/Button'
import type { ColEx, ComponentMapType, ComponentProps } from './index';
// import type { TableActionType } from '/@/components/Table/src/types/table'
import type { CSSProperties } from 'vue';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';
import type { FormProps } from 'ant-design-vue/lib/form';

export type { FormProps, RowProps };

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
/** 获取所有字段名 */
export type GetFieldKeys<T> = Exclude<keyof T, symbol | number>;

export interface RenderCallbackParams<T = string> {
  schemaItem: FormItemSchema;
  formModel: T extends string ? Recordable : Record<GetFieldKeys<T>, any>;
  field: T extends string ? string : GetFieldKeys<T>;
}

export interface ButtonProps {
  text?: string;
}

export interface FormActionType {
  formModel?: Recordable;
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => any;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => Promise<void>;
  setProps: (formProps: Partial<FormSchema>) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormItemSchema,
    prefixField: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];

/** 表单 */
export interface FormSchema<T = any> extends FormProps {
  // Form value
  model?: any;
  // The width of all items in the entire form
  labelWidth?: number | string;
  //Row configuration for the entire form
  rowProps?: RowProps;
  // Submit form on reset
  submitOnReset?: boolean;

  // General row style
  baseRowStyle?: CSSProperties;

  // General col configuration
  baseColProps?: Partial<ColEx>;

  // Form configuration rules
  schemas: FormItemSchema<T>[];
  // Function values used to merge into dynamic control form items
  mergeDynamicData?: any;
  // Compact mode for search forms
  compact?: boolean;
  // Blank line span
  emptySpan?: number | Partial<ColEx>;
  // Whether to disable
  disabled?: boolean;
  // Time interval fields are mapped into multiple
  fieldMapToTime?: FieldMapToTime;
  // Placeholder is set automatically
  autoSetPlaceHolder?: boolean;
  // Auto submit on press enter on input
  autoSubmitOnEnter?: boolean;
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;
  // Whether to show collapse and expand buttons
  showAdvancedButton?: boolean;
  // Whether to focus on the first input box, only works when the first form item is input
  autoFocusFirstItem?: boolean;
  // Automatically collapse over the specified number of rows
  autoAdvancedLine?: number;
  // Always show lines
  alwaysShowLines?: number;
  // Whether to show the operation button
  showActionButtonGroup?: boolean;

  // Reset button configuration
  resetButtonOptions?: Partial<ButtonProps>;

  // Confirm button configuration
  submitButtonOptions?: Partial<ButtonProps>;

  // Operation column configuration
  actionColOptions?: Partial<ColEx>;

  // Show reset button
  showResetButton?: boolean;
  // Show confirmation button
  showSubmitButton?: boolean;

  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  transformDateFunc?: (date: any) => string;
}

/** 表单项 */
export interface FormItemSchema<T = string> {
  /** 字段名 */
  field: T extends string ? string : GetFieldKeys<T>;
  // Event name triggered by internal value change, default change
  changeEvent?: string;
  // Variable name bound to v-model Default value
  valueField?: string;
  // Label name
  label: string;
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
  // render component
  component: ComponentMapType | Component;
  // 组件参数
  componentProps?:
    | ComponentProps
    | ((opt: {
        /** 当前表单项 */
        schemaItem: FormItemSchema<T>;
        /** 动态表单实例 */
        schemaFormRef: FormActionType;
        /** 当前表单数据模型 */
        formModel: T extends string ? Recordable : Record<GetFieldKeys<T>, any>;
      }) => ComponentProps);

  componentSlots?:
    | ((renderCallbackParams: RenderCallbackParams<T>) => Recordable<(...args) => any>)
    | VNode
    | VNode[]
    | string
    | Recordable<(...args) => any>;
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

  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  // Matching details components
  span?: number;
  /** 作用同v-show */
  vShow?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);
  /** 作用同v-if */
  vIf?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  // Render the content in the form-item tag
  render?: (renderCallbackParams: RenderCallbackParams<T>) => VNode | VNode[] | string;

  // Rendering col content requires outer wrapper form-item
  renderColContent?: (renderCallbackParams: RenderCallbackParams<T>) => VNode | VNode[] | string;

  // Custom slot, in from-item
  slot?: string;

  // Custom slot, similar to renderColContent
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
