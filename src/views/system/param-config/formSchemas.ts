import type { FormSchema } from '@/components/core/schema-form/';

export const getSchemas = (configId = -1): FormSchema<API.CreateParamConfigParams>[] => [
  {
    field: 'name',
    component: 'Input',
    label: '参数名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'key',
    component: 'Input',
    label: '参数键名',
    rules: [{ required: true, type: 'string' }],
    dynamicDisabled: () => configId !== -1,
  },
  {
    field: 'value',
    component: 'Input',
    label: '参数值',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
  },
];
