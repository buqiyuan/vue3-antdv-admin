import type { FormSchema } from '@/components/core/schema-form/';

export const baseSchemas: FormSchema<API.ParamConfigDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '参数名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'key',
    component: 'Input',
    label: 'key',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'value',
    component: 'Input',
    label: 'value',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    colProps: {
      span: 24,
    },
    required: true,
  },
];
