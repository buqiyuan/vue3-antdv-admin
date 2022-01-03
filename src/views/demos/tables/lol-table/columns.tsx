import type { TableColumn } from '@/components/core/dynamic-table';
import { Tag } from 'ant-design-vue';
import router from '@/router';
import ImagePreview from '@/components/basic/image-preview/index';

export const columns: TableColumn[] = [
  {
    title: '头像',
    align: 'center',
    width: 100,
    hideInSearch: true,
    dataIndex: 'avatar',
    bodyCell: ({ record }) => (
      <ImagePreview src={record.avatar} preview={{ src: record.posters }} key={record.avatar} />
    ),
  },
  {
    title: '英雄名称',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '英雄称号',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '定位',
    align: 'center',
    dataIndex: 'roles',
    bodyCell: ({ record }) => (
      <>
        {record.roles?.map((name) => (
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
        onClick: () => router.push({ name: 'demos-table-lol-info', params: { id: record.heroId } }),
      },
    ],
  },
];
