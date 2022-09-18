import type { TableColumn } from '@/components/core/dynamic-table';
// import { Avatar, Space, Tag } from 'ant-design-vue';

export type TableListItem = API.ParamConfigListItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '参数名称',
    width: 220,
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '参数键名',
    width: 220,
    align: 'center',
    dataIndex: 'key',
  },
  {
    title: '参数值',
    dataIndex: 'value',
    width: 320,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 300,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updatedAt',
  },
];
