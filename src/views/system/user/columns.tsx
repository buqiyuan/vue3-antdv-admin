import { Avatar, Space, Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';
import { baseApiUrl } from '@/utils/request';

export type TableListItem = API.UserEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const getAvatarUrl = (path: string) => {
  return /^https?:\/\//.test(path) ? path : baseApiUrl + path;
};

export const baseColumns: TableColumnItem[] = [
  {
    title: '头像',
    width: 80,
    dataIndex: 'avatar',
    hideInSearch: true,
    customRender: ({ record }) => <Avatar src={getAvatarUrl(record.avatar)} />,
  },
  {
    title: '用户名',
    width: 120,
    dataIndex: 'username',
  },
  {
    title: '呢称',
    width: 120,
    hideInSearch: true,
    dataIndex: 'nickname',
  },
  {
    title: '所在部门',
    dataIndex: 'dept',
    hideInSearch: true,
    width: 180,
    customRender: ({ record }) => {
      return <Tag>{record.dept?.name}</Tag>;
    },
  },
  {
    title: '所属角色',
    dataIndex: 'roleNames',
    hideInSearch: true,
    width: 220,
    customRender: ({ record }) => (
      <Space>
        {record.roles.map((item) => (
          <Tag color={'success'} key={item.id}>
            {item.name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '邮箱',
    width: 120,
    dataIndex: 'email',
  },
  {
    title: '手机',
    width: 120,
    dataIndex: 'phone',
  },
  {
    title: '备注',
    width: 120,
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    hideInSearch: true,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
    },
    customRender: ({ record }) => {
      const isEnable = ~~record.status === 1;
      return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? '启用' : '禁用'}</Tag>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 120,
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    width: 120,
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];
