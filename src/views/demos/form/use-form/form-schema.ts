import type { FormSchema } from '@/components/core/schema-form/';

export const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8,
    },
    vShow: ({ formModel }) => {
      return !!formModel.field5;
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8,
    },
    vShow: ({ formModel }) => {
      return !!formModel.field6;
    },
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
    dynamicDisabled: ({ formModel }) => {
      return !!formModel.field7;
    },
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8,
    },
    dynamicRules: ({ formModel }) => {
      return formModel.field8 ? [{ required: true, message: '字段4必填' }] : [];
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field11',
    component: 'DatePicker',
    label: '字段11',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field5',
    component: 'Switch',
    label: '是否显示字段1(css控制)',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
  {
    field: 'field6',
    component: 'Switch',
    label: '是否显示字段2(dom控制)',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
  {
    field: 'field7',
    component: 'Switch',
    label: '是否禁用字段3',
    colProps: {
      span: 8,
    },
    labelWidth: 200,
  },
  {
    field: 'field8',
    component: 'Switch',
    label: '字段4是否必填',
    colProps: {
      span: 8,
    },
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
    labelWidth: 200,
  },
];
