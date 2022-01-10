import type { TableColumn } from '@/components/core/dynamic-table';
import { Tag } from 'ant-design-vue';
import ImagePreview from '@/components/basic/image-preview/index';

export const columns: TableColumn[] = [
  {
    title: '头像',
    align: 'center',
    width: 100,
    hideInSearch: true,
    dataIndex: 'faceimg',
    bodyCell: ({ record }) => (
      <ImagePreview src={record.faceimg} preview={{ src: record.heroimg }} key={record.faceimg} />
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
