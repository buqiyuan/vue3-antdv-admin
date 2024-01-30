import type { FormSchema } from '@/components/core/schema-form/';

export const taskSchemas: FormSchema<API.TaskDto>[] = [
  {
    field: 'type',
    component: 'RadioGroup',
    label: '名称',
    defaultValue: 0,
    rules: [{ required: true, type: 'number' }],
    componentProps: {
      options: [
        {
          label: 'Cron',
          value: 0,
        },
        {
          label: '时间间隔',
          value: 1,
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '任务名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'service',
    component: 'Input',
    label: '服务路径',
    rules: [{ required: true, type: 'string' }],
    componentProps: {
      placeholder: '请输入调用服务的路径',
    },
  },
  {
    field: 'data',
    component: 'Input',
    label: '任务参数',
    componentProps: {
      placeholder: '请输入任务参数（可不填）',
    },
  },
  {
    field: 'limit',
    component: 'InputNumber',
    label: '执行次数',
    defaultValue: -1,
    componentProps: {
      min: -1,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'cron',
    component: 'Input',
    label: 'Cron',
    rules: [{ required: true, type: 'string' }],
    vIf: ({ formModel }) => formModel.type === 0,
    componentProps: {
      placeholder: '请输入Cron表达式',
    },
  },
  {
    field: 'every',
    component: 'InputNumber',
    label: '执行间隔',
    defaultValue: 60000,
    vIf: ({ formModel }) => formModel.type === 1,
    rules: [{ required: true, type: 'number' }],
    componentProps: {
      min: 100,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'startTime',
    component: 'DatePicker',
    label: '开始时间',
    vIf: ({ formModel }) => formModel.type === 0,
    componentProps: {
      showTime: true,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'endTime',
    component: 'DatePicker',
    label: '结束时间',
    vIf: ({ formModel }) => formModel.type === 0,
    componentProps: {
      showTime: true,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
  },
  {
    field: 'status',
    component: 'RadioGroup',
    defaultValue: 1,
    label: '状态',
    componentProps: {
      options: [
        {
          label: '运行',
          value: 1,
        },
        {
          label: '停止',
          value: 0,
        },
      ],
    },
  },
];
