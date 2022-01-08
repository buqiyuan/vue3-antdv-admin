import type { TableColumn } from '@/components/core/dynamic-table';
import { Tag } from 'ant-design-vue';

const names = ['王路飞', '王大蛇', '李白', '刺客伍六七'];
const clothes = ['西装', '领带', '裙子', '包包'];
export const tableData = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  date: new Date().toLocaleString(),
  name: names[~~(Math.random() * 4)],
  clothes: clothes[~~(Math.random() * 4)],
  price: ~~(Math.random() * 1000),
  gender: ~~(Math.random() * 2),
  status: ~~(Math.random() * 2),
}));

const getClothesByGender = (gender: number) => {
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

// 数据项类型
export type ListItemType = typeof tableData[number];
// 使用TableColumn<ListItemType> 将会限制dataIndex的类型，但换来的是dataIndex有类型提示
export const columns: TableColumn<ListItemType>[] = [
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name',
    formItemProps: {
      required: true,
    },
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender',
    formItemProps: {
      component: 'Select',
      componentProps: ({ schemaFormRef, formModel }) => ({
        options: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 0,
          },
        ],
        onChange() {
          // 根据当前选择的性别，更新衣服可选项
          schemaFormRef.updateSchema({
            field: 'clothes',
            componentProps: {
              options: getClothesByGender(formModel.gender),
            },
          });
          formModel['clothes'] = undefined;
        },
      }),
    },
    bodyCell: ({ record }) => <>{['女', '男'][record.gender]}</>,
  },
  {
    title: '衣服',
    align: 'center',
    dataIndex: 'clothes',
    formItemProps: {
      component: 'Select',
    },
  },
  {
    title: '价格',
    align: 'center',
    dataIndex: 'price',
    formItemProps: {
      component: 'Select',
    },
    bodyCell: ({ record }) => <>{[record.price]}元</>,
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    formItemProps: {
      component: 'Select',
      componentProps: {
        request: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const data = [
                {
                  label: '已售罄',
                  value: 0,
                },
                {
                  label: '热卖中',
                  value: 1,
                },
              ];
              resolve(data);
            }, 1500);
          });
        },
      },
    },
    bodyCell: ({ record }) => (
      <Tag color={record.status == 1 ? 'red' : 'default'}>
        {['已售罄', '热卖中'][record.status]}
      </Tag>
    ),
  },
];
