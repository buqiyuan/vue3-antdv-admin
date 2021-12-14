import type { TableColumn } from '@/components/dynamic-table';
// import { Avatar, Space, Tag } from 'ant-design-vue';

export type TableListItem = API.RoleListResultItem;

interface ColumnsParams {
  openMenuModal: (record: TableListItem) => void;
  delRowConfirm: (record: TableListItem) => void;
}

export const getColumns = (columnParams: ColumnsParams): TableColumn<TableListItem>[] => {
  const { delRowConfirm, openMenuModal } = columnParams;
  return [
    {
      title: '#',
      dataIndex: 'id',
      width: 55,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '名称',
      width: 200,
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '标识',
      width: 80,
      align: 'center',
      dataIndex: 'label',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'updatedAt',
      hideInSearch: true,
    },
    {
      title: '操作',
      width: 160,
      dataIndex: '$action',
      hideInSearch: true,
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'sys/role/update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
          auth: 'sys/role/delete',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
};
