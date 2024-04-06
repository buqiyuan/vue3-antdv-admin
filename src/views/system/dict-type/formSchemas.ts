import type { FormSchema } from '@/components/core/schema-form/';

export const baseSchemas: FormSchema<API.DictTypeDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '字典名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'code',
    component: 'Input',
    label: '字典编码',
    rules: [{ required: true, type: 'string' }],
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
    componentProps: {
      autoSize: { minRows: 2 },
    },
  },
];
