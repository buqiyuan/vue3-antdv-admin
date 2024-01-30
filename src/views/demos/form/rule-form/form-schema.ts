import type { FormSchema } from '@/components/core/schema-form/';

export const schemas: FormSchema[] = [
  {
    field: 'field1.dd.cc',
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
    rules: [{ required: true }],
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
          const { promise, resolve, reject } = Promise.withResolvers<void>();
          setTimeout(() => {
            if (value.includes('admin')) {
              reject('该字段不能包含admin关键字');
            } else {
              resolve();
            }
          }, 100);
          return promise;
        },
      },
    ],
  },
];
