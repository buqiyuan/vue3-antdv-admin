import type { TableColumn } from '@/components/dynamic-table';
import { Avatar, Tag } from 'ant-design-vue';

export const columns: TableColumn[] = [
  {
    title: '头像',
    align: 'center',
    width: 100,
    dataIndex: 'heroimg',
    bodyCell: ({ record }) => <Avatar src={record.heroimg} />,
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
    bodyCell: ({ record }) => (
      <>
        {record.skin_name.split('|').map((name) => (
          <Tag color={'blue'}>{name}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: '$action',
    actions: ({ record }) => [
      {
        label: '查看详情',
        onClick: () => window.open(record.infourl),
      },
    ],
  },
];
