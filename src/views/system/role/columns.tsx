import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.RoleEntity;
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
    title: '角色名称',
    width: 200,
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '角色值',
    width: 180,
    align: 'center',
    dataIndex: 'value',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 80,
    customRender: ({ record }) => {
      const enable = ~~record.status === 1;
      return <Tag color={enable ? 'green' : 'red'}>{enable ? '启用' : '停用'}</Tag>;
    },
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
