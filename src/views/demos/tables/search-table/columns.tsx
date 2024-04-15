import { debounce } from 'lodash-es';
import { Tag, Spin } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { waitTime } from '@/utils/common';
import { useDictStore } from '@/store/modules/dict';

const names = ['王路飞', '王大蛇', '李白', '刺客伍六七'];
const { fetchDict, dictPending, showDictLabel } = useDictStore();

export const fetchStatusMapData = async (keyword = '') => {
  const [data] = await fetchDict('sell_status');
  return waitTime<LabelValueOptions>(
    100,
    data.filter((n) => n.label.includes(keyword)),
  );
};

export const getClothesByGender = (gender: number) => {
  if (gender === 1) {
    // 男
    return [
      {
        label: '西装',
        value: 1,
      },
      {
        label: '领带',
        value: 0,
      },
    ];
  } else if (gender === 0) {
    //女
    return [
      {
        label: '裙子',
        value: 1,
      },
      {
        label: '包包',
        value: 0,
      },
    ];
  }
  return [];
};

export const tableData = Array.from({ length: 30 }).map((_, i) => {
  const gender = ~~(Math.random() * 2);
  return {
    id: i + 1,
    date: new Date().toLocaleString(),
    name: names[~~(Math.random() * 4)],
    clothes: getClothesByGender(gender)[~~(Math.random() * 2)].label,
    price: ~~(Math.random() * 1000),
    gender,
    img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    status: ~~(Math.random() * 2),
    nested: {
      prop: `嵌套属性 ${i + 1}`,
    },
  };
});

// 数据项类型
export type ListItemType = (typeof tableData)[number];
// 使用TableColumn<ListItemType> 将会限制dataIndex的类型，但换来的是dataIndex有类型提示
export const columns: TableColumn<ListItemType>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
    width: 300,
    resizable: true,
    formItemProps: {
      defaultValue: '李白',
      required: true,
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 120,
    resizable: true,
    formItemProps: {
      component: 'Select',
      componentProps: ({ formInstance, formModel }) => ({
        request: async () => {
          const [data] = await fetchDict('gender');
          return data;
        },
        onChange() {
          // 根据当前选择的性别，更新衣服可选项
          formInstance?.updateSchema({
            field: 'clothes',
            componentProps: {
              options: getClothesByGender(formModel.gender),
            },
          });
          formModel['clothes'] = '';
          // console.log('formInstance', formInstance);
        },
      }),
    },
    // customRender: ({ record }) => ['女', '男'][record.gender],
    customRender: ({ record }) => (
      <Spin spinning={dictPending['sell_status']} size="small">
        {showDictLabel('gender', record.gender)}
      </Spin>
    ),
  },
  {
    title: '衣服',
    dataIndex: 'clothes',
    formItemProps: {
      component: 'Select',
      componentProps: ({ tableInstance }) => ({
        onChange() {
          tableInstance?.reload();
        },
      }),
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    formItemProps: {
      component: 'InputNumber',
    },
    customRender: ({ record }) => `${record.price}元`,
  },
  {
    title: '嵌套属性',
    dataIndex: ['nested', 'prop'],
  },
  {
    title: '状态',
    dataIndex: 'status',
    formItemProps: {
      component: 'Select',
      componentProps: ({ formInstance, schema }) => ({
        showSearch: true,
        filterOption: false,
        request: () => {
          return fetchStatusMapData();
        },
        onSearch: debounce(async (keyword) => {
          schema.value.loading = true;
          const newSchema = {
            field: 'status',
            componentProps: {
              options: [] as LabelValueOptions,
            },
          };
          formInstance?.updateSchema([newSchema]);
          console.log('onSearch keyword', keyword);
          const result = await fetchStatusMapData(keyword).finally(
            () => (schema.value.loading = false),
          );
          newSchema.componentProps.options = result;
          formInstance?.updateSchema([newSchema]);
        }, 500),
        onChange(value: string) {
          console.log('onChange', value);
        },
      }),
    },
    customRender: ({ record }) => (
      <Spin spinning={dictPending['sell_status']} size="small">
        <Tag color={record.status == 1 ? 'red' : 'default'}>
          {showDictLabel('sell_status', record.status)}
        </Tag>
      </Spin>
    ),
  },
];
