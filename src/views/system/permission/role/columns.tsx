import type { TableColumn } from '@/components/core/dynamic-table';
// import { Avatar, Space, Tag } from 'ant-design-vue';

export type TableListItem = API.RoleListResultItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
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
];
