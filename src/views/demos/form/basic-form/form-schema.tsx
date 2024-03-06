import { UploadOutlined } from '@ant-design/icons-vue';
import { Radio, Button } from 'ant-design-vue';
import type { FormSchema } from '@/components/core/schema-form';
import { optionsListApi } from '@/api/demo/select';
import { waitTime } from '@/utils/common';

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
];
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
};

const fetchOptionList = async () => {
  await waitTime(3000);
  const data = await optionsListApi();
  return data.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

export const schemas: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '基础字段',
  },
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',

    colProps: {
      span: 8,
    },
    // componentProps:{},
    // can func
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
    componentSlots: () => {
      return {
        prefix: () => 'pSlot',
        suffix: () => 'sSlot',
      };
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: '带后缀',
    defaultValue: '111',
    colProps: {
      span: 8,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
    afterSlot: '天',
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8,
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
  },
  {
    field: 'field8',
    component: 'Checkbox',
    label: '字段8',
    colProps: {
      span: 8,
    },
    componentSlots: 'Check',
  },
  {
    field: 'field9',
    component: 'Switch',
    label: '字段9',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field10',
    component: 'RadioGroup',
    label: '字段10',
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
  },
  {
    field: 'field11',
    component: 'Cascader',
    label: '字段11',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    field: 'divider-api-select',
    component: 'Divider',
    label: '远程下拉演示',
  },
  {
    field: 'field30',
    component: 'Select',
    label: '懒加载远程下拉',
    required: true,
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      request: async (values) => {
        console.log('field30 fetch', values);
        return await fetchOptionList();
      },
      onChange: (e) => {
        console.log('selected:', e);
      },
    },
    colProps: {
      span: 8,
    },
    defaultValue: '1',
  },
  {
    field: 'field31',
    component: 'Input',
    label: '下拉本地搜索',
    helpMessage: ['Select组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
    required: true,
    slot: 'localSearch',
    colProps: {
      span: 8,
    },
    defaultValue: '0',
  },
  {
    field: 'field32',
    component: 'Input',
    label: '下拉远程搜索',
    helpMessage: ['Select组件', '将关键词发送到接口进行远程搜索'],
    required: true,
    slot: 'remoteSearch',
    colProps: {
      span: 8,
    },
    defaultValue: '0',
  },
  {
    field: 'field33',
    component: 'TreeSelect',
    label: '远程下拉树',
    helpMessage: ['TreeSelect组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      request: () => {
        const treeData = Array.from({ length: 5 }).map((_, i) => ({
          title: `选项 ${i}`,
          value: `选项 ${i}`,
          children: Array.from({ length: 3 }).map((_, j) => ({
            title: `选项 ${i}-${j}`,
            value: `选项 ${i}-${j}`,
          })),
        }));
        return waitTime(2000, treeData);
      },
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field34',
    component: ({ schema }) => {
      const options = schema.value.componentProps?.requestResult || [];
      return <Radio.Group options={options.slice(0, 2)}></Radio.Group>;
    },
    label: '远程Radio',
    helpMessage: ['RadioGroup组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      optionType: 'button',
      request: async () => {
        const data = await fetchOptionList();
        return data;
      },
    },
    defaultValue: '0',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field35',
    component: 'RadioGroup',
    label: '远程Radio',
    helpMessage: ['RadioGroup组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      optionType: 'button',
      request: async () => {
        const data = await fetchOptionList();
        return data.slice(0, 2);
      },
    },
    defaultValue: '1',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '字段联动',
  },
  {
    field: 'province',
    component: 'Select',
    label: '省份',
    colProps: {
      span: 8,
    },
    componentProps: ({ formModel, formInstance }) => {
      return {
        options: provincesOptions,
        placeholder: '省份与城市联动',
        onChange: (id: string) => {
          // console.log(id);
          const citiesOptions =
            {
              1: citiesOptionsData.guangdong,
              2: citiesOptionsData.jiangsu,
            }[id] || [];

          formModel.city = undefined; //  reset city value
          const { updateSchema } = formInstance;
          // console.log('citiesOptions', citiesOptions);
          updateSchema({
            field: 'city',
            componentProps: {
              options: citiesOptions,
            },
          });
        },
      };
    },
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [], // defalut []
      placeholder: '省份与城市联动',
    },
  },
  {
    field: 'divider-selects',
    component: 'Divider',
    label: '互斥多选',
    helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
  },
  {
    field: 'selectA',
    component: 'Select',
    label: '互斥SelectA',
    slot: 'selectA',
    defaultValue: [],
    colProps: {
      span: 8,
    },
  },
  {
    field: 'selectB',
    component: 'Select',
    label: '互斥SelectB',
    slot: 'selectB',
    defaultValue: [],
    colProps: {
      span: 8,
    },
  },
  {
    field: 'divider-others',
    component: 'Divider',
    label: '其它',
  },
  {
    field: 'field20',
    component: 'InputNumber',
    label: '字段20',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field21',
    component: 'Slider',
    label: '字段21',
    componentProps: {
      min: 0,
      max: 100,
      range: true,
      marks: {
        20: '20°C',
        60: '60°C',
      },
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field22',
    component: 'Rate',
    label: '字段22',
    defaultValue: 3,
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: false,
      allowHalf: true,
    },
  },
  {
    field: 'field23',
    component: 'Upload',
    label: '字段23',
    colProps: {
      span: 8,
    },
    componentProps: {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    },
    componentSlots: {
      default: () => (
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      ),
    },
  },
];
