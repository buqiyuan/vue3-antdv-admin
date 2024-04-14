import { formProps, type FormProps } from 'ant-design-vue/es/form';
import type { ColEx } from './types/component';
import type { ExtractPublicPropTypes, ComponentInternalInstance, CSSProperties } from 'vue';
import type { FieldMapToTime, FormSchema, RowProps } from './types/form';
import type { ButtonProps } from '@/components/basic/button';
import type { TableActionType } from '@/components/core/dynamic-table';
import { isObject } from '@/utils/is';

export const aFormPropKeys = Object.keys(formProps());

export const schemaFormProps = {
  ...formProps(),
  layout: {
    type: String as PropType<FormProps['layout']>,
    default: 'horizontal',
  },
  /** 预置字段默认值 */
  initialValues: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string | null>,
    default: 0,
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  compact: { type: Boolean as PropType<boolean> },
  /** 表单配置规则 */
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  autoSetPlaceHolder: { type: Boolean as PropType<boolean>, default: true },
  /** 在INPUT组件上单击回车时，是否自动提交 */
  autoSubmitOnEnter: { type: Boolean as PropType<boolean>, default: false },
  submitOnReset: { type: Boolean as PropType<boolean> },
  submitOnChange: { type: Boolean as PropType<boolean> },
  /** 禁用表单 */
  disabled: { type: Boolean as PropType<boolean> },
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0,
  },
  /** 是否显示收起展开按钮 */
  showAdvancedButton: { type: Boolean as PropType<boolean> },
  /** 转化时间 */
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date;
    },
  },
  rulesMessageJoinLabel: { type: Boolean as PropType<boolean>, default: true },
  /** 超过3行自动折叠 */
  autoAdvancedLine: {
    type: Number as PropType<number>,
    default: 3,
  },
  /** 不受折叠影响的行数 */
  alwaysShowLines: {
    type: Number as PropType<number>,
    default: 1,
  },

  /** 是否显示操作按钮 */
  showActionButtonGroup: { type: Boolean as PropType<boolean>, default: true },
  /** 操作列Col配置 */
  actionColOptions: Object as PropType<Partial<ColEx>>,
  /** 显示重置按钮 */
  showResetButton: { type: Boolean as PropType<boolean>, default: true },
  /** 是否聚焦第一个输入框，只在第一个表单项为input的时候作用 */
  autoFocusFirstItem: { type: Boolean as PropType<boolean> },
  /** 重置按钮配置 */
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,

  /** 显示确认按钮 */
  showSubmitButton: { type: Boolean as PropType<boolean>, default: true },
  /** 确认按钮配置 */
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,

  /** 自定义重置函数 */
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,
  /** 动态表格实例 */
  tableInstance: {
    type: Object as PropType<TableActionType>,
  },

  rowProps: Object as PropType<RowProps>,
};

export const schemaFormEmits = {
  register: (exposed: ComponentInternalInstance['exposed']) => isObject(exposed),
  reset: (formModel: Recordable<any>) => isObject(formModel),
  submit: (formModel: Recordable<any>) => isObject(formModel),
  'advanced-change': () => true,
};

export type SchemaFormEmits = typeof schemaFormEmits;

export type SchemaFormEmitFn = EmitFn<SchemaFormEmits>;

export type SchemaFormProps<T extends object = any> = Partial<
  ExtractPublicPropTypes<Omit<typeof schemaFormProps, 'schemas'>> & {
    schemas: FormSchema<T>[];
  } & EmitsToProps<SchemaFormEmits>
>;
