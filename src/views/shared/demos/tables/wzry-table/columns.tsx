import type { TableColumn } from '@/components/dynamic-table';
import { Image, Tag } from 'ant-design-vue';

export const columns: TableColumn[] = [
  {
    title: '头像',
    align: 'center',
    width: 100,
    hideInSearch: true,
    dataIndex: 'faceimg',
    bodyCell: ({ record }) => <Image src={record.faceimg} />,
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
        {record.skin_name?.split('|')?.map((name) => (
          <Tag color={'blue'} key={name}>
            {name}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    dataIndex: '$action',
    actions: ({ record }) => [
      {
        label: '查看详情',
        onClick: () => window.open(record.infourl),
      },
    ],
  },
];
