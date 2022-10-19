import { Tag, Image } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export const columns: TableColumn[] = [
  {
    title: '头像',
    align: 'center',
    width: 100,
    hideInSearch: true,
    dataIndex: 'faceimg',
    customRender: ({ record }) => (
      <Image src={record.faceimg} preview={{ src: record.heroimg }} key={record.faceimg}></Image>
    ),
  },
  {
    title: '英雄名称',
    align: 'center',
    dataIndex: 'cname',
  },
  {
    title: '英雄称号',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '定位',
    align: 'center',
    dataIndex: 'occupation',
  },
  {
    title: '皮肤',
    align: 'center',
    dataIndex: 'skin_name',
    formItemProps: {
      component: 'Select',
    },
    customRender: ({ record }) => (
      <div>
        {record.skin_name?.split('|')?.map((name) => (
          <Tag color={'blue'} key={name}>
            {name}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    dataIndex: 'ACTION',
    actions: ({ record }) => [
      {
        label: '查看详情',
        onClick: () => window.open(record.infourl),
      },
    ],
  },
];
