import type { TableColumn } from '@/components/dynamic-table';
import { Avatar, Space, Tag } from 'ant-design-vue';

export type TableListItem = API.UserListPageResultItem;

interface ColumnsParams {
  openUserModal: (record: TableListItem) => void;
  delRowConfirm: (record: number | number[]) => void;
  openUpdatePasswordModal: (record: TableListItem) => void;
}

export const getColumns = (columnParams: ColumnsParams): TableColumn<TableListItem>[] => {
  const { openUpdatePasswordModal, openUserModal, delRowConfirm } = columnParams;
  return [
    {
      title: '头像',
      width: 80,
      dataIndex: 'headImg',
      hideInSearch: true,
      bodyCell: ({ record }) => <Avatar src={record.headImg} />,
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
      bodyCell: ({ record }) => (
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
      bodyCell: ({ record }) => {
        const isEnable = record.status === 1;
        return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? '启用' : '禁用'}</Tag>;
      },
    },
    {
      title: '操作',
      width: 190,
      dataIndex: '$action',
      hideInSearch: true,
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          onClick: () => openUserModal(record),
        },
        {
          label: '改密',
          onClick: () => openUpdatePasswordModal(record),
        },
        {
          label: '删除',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record.id),
          },
        },
      ],
    },
  ];
};
