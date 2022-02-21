import type { FormItemSchema } from '@/components/core/schema-form/types/form';

export const schemas: FormItemSchema[] = [
  {
    field: 'type',
    component: 'RadioGroup',
    label: '类型',
    defaultValue: 1,
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '类型一',
          value: 1,
        },
        {
          label: '类型二',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'isExtenal',
    component: 'Switch',
    label: '是否外链',
    colProps: {
      span: 8,
    },
    vIf: ({ formModel }) => formModel['type'] === 2,
  },
  {
    field: 'isEbed',
    component: 'Switch',
    label: '是否内嵌',
    colProps: {
      span: 8,
    },
    vIf: ({ formModel }) => formModel['type'] === 2 && formModel['isExtenal'],
  },
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8,
    },
    required: true,
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8,
    },
    required: true,
  },
  {
    field: 'id',
    label: 'id',
    required: true,
    defaultValue: 0,
    component: 'InputNumber',
    vShow: false,
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
    required: true,
  },
  {
    field: 'field33',
    component: 'DatePicker',
    label: '字段33',
    colProps: {
      span: 8,
    },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [{ required: true, type: 'string' }],
  },
  // {
  //   field: 'field44',
  //   component: 'InputCountDown',
  //   label: '验证码',
  //   colProps: {
  //     span: 8
  //   },
  //   required: true
  // },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8,
    },
    componentProps: {
      mode: 'multiple',
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
    rules: [
      {
        required: true,
        message: '请输入aa',
        type: 'array',
      },
    ],
  },
  {
    field: 'field441',
    component: 'Input',
    label: '自定义校验',
    colProps: {
      span: 8,
    },
    rules: [
      {
        required: true,
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject('值不能为空');
          }
          if (value === '1') {
            return Promise.reject('值不能为1');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
    rules: [{ required: true, message: '请选择你的爱好' }],
  },
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '字段7',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
    rules: [{ required: true, message: '覆盖默认生成的校验信息' }],
  },
  {
    field: 'field8',
    component: 'Input',
    label: '后端异步验证',
    colProps: {
      span: 8,
    },
    helpMessage: ['本字段演示异步验证', '本地规则：必须填写', '后端规则：不能包含admin'],
    rules: [
      {
        required: true,
        message: '请输入数据',
      },
      {
        validator(_, value = '') {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (value.includes('admin')) {
                reject('该字段不能包含admin关键字');
              } else {
                resolve();
              }
            }, 100);
          });
        },
      },
    ],
  },
];
