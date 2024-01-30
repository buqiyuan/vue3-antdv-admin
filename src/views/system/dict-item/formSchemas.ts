import type { FormSchema } from '@/components/core/schema-form/';

export const getBaseSchemas = (
  dictTypeList: any[],
  typeId: number,
): FormSchema<API.DictItemDto>[] => [
  {
    field: 'typeId',
    component: 'Select',
    label: '所属字典类型',
    rules: [{ required: true, type: 'number' }],
    defaultValue: typeId,
    componentProps: {
      options: dictTypeList,
      disabled: true,
    },
  },
  {
    field: 'label',
    component: 'Input',
    label: '字典项名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'value',
    component: 'Input',
    label: '字典项值',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'orderNo',
    component: 'InputNumber',
    label: '排序',
    defaultValue: 0,
    componentProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    colProps: {
      span: 24,
    },
  },
];
