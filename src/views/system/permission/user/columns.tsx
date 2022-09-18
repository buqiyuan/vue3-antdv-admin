import { Avatar, Space, Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.UserListPageResultItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '头像',
    width: 80,
    dataIndex: 'headImg',
    hideInSearch: true,
    customRender: ({ record }) => <Avatar src={record.headImg} />,
  },
  {
    title: '姓名',
    width: 120,
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '用户名',
    width: 120,
    align: 'center',
    dataIndex: 'username',
  },
  {
    title: '所在部门',
    dataIndex: 'departmentName',
    hideInSearch: true,
    align: 'center',
    width: 180,
  },
  {
    title: '所属角色',
    dataIndex: 'roleNames',
    align: 'center',
    hideInSearch: true,
    width: 220,
    customRender: ({ record }) => (
      <Space>
        {record.roleNames.map((item) => (
          <Tag color={'success'} key={item}>
            {item}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '呢称',
    width: 120,
    align: 'center',
    hideInSearch: true,
    dataIndex: 'nickName',
  },
  {
    title: '邮箱',
    width: 120,
    align: 'center',
    dataIndex: 'email',
  },
  {
    title: '手机',
    width: 120,
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '备注',
    width: 120,
    align: 'center',
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
      const isEnable = record.status === 1;
      return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? '启用' : '禁用'}</Tag>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 120,
    hideInSearch: true,
    formItemProps: {
      component: 'DatePicker',
      componentProps: {
        class: 'w-full',
      },
    },
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    width: 120,
    hideInSearch: true,
    formItemProps: {
      component: 'DatePicker',
      componentProps: {
        class: 'w-full',
      },
    },
  },
];
