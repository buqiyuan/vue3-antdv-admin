import type { RowProps } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import type { FormItemProps } from 'ant-design-vue/es/form/FormItem';
import type { Component, ComputedRef, UnwrapRef, VNode } from 'vue';
import type { ButtonProps as AntdButtonProps } from '@/components/basic/button';
import type { ColEx, ComponentType, ComponentProps } from './component';
import type { SchemaFormType } from '../hooks';
import type { TableActionType } from '@/components/core/dynamic-table';

export type { RowProps };

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

/** 获取所有字段名 */
export type GetFieldKeys<T> = Exclude<keyof T, symbol | number>;

export interface RenderCallbackParams<
  T extends object = Recordable,
  P extends ComponentProps = ComponentProps,
> {
  schema: ComputedRef<
    FormSchema<T> & {
      componentProps: P;
    }
  >;
  /** 响应式的表单数据对象 */
  formModel: Objectable<T>;
  field: GetFieldKeys<T>;
  /** 非响应式的表单数据对象(最终表单要提交的数据) */
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
export type CustomRenderFn<T extends object = Recordable> = (
  renderCallbackParams: RenderCallbackParams<T>,
) => VNode | VNode[] | string;

export interface ButtonProps extends AntdButtonProps {
  text?: string;
}

export type UnwrapFormSchema<T extends object = Recordable> = UnwrapRef<FormSchema<T>>;

type ComponentSchema<T extends object = Recordable> =
  | {
      [K in ComponentType]: {
        /** 表单项对应的组件，eg: Input */
        component: K;
        /** 表单组件属性 */
        componentProps?:
          | ComponentProps<K>
          | ((opt: RenderCallbackParams<T, ComponentProps<K>>) => ComponentProps<K>);
      };
    }[ComponentType]
  | {
      component: CustomRenderFn<T> | ((opt: RenderCallbackParams<T>) => Component);
      componentProps?: ComponentProps | ((opt: RenderCallbackParams<T>) => ComponentProps);
    };

/** 表单项 */
export type FormSchema<T extends object = Recordable> = ComponentSchema<T> & {
  /** 字段名 */
  field: GetFieldKeys<T>;
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
  vShow?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => any);
  /** 作用同v-if */
  vIf?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => any);

  // 渲染col内容需要外层包装form-item
  renderColContent?: CustomRenderFn<T>;

  /** Custom slot, in from-item */
  slot?: string;
  /** 表单组件前置插槽 */
  beforeSlot?: string | ((renderCallbackParams: RenderCallbackParams<T>) => any);
  /** 表单组件后置插槽 */
  afterSlot?: string | ((renderCallbackParams: RenderCallbackParams<T>) => any);

  // 自定义槽，类似renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams<T>) => Rule[];
};
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
