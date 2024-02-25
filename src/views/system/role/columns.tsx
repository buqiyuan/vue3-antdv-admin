import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.RoleEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '#',
    dataIndex: 'id',
    width: 55,
    hideInSearch: true,
  },
  {
    title: '角色名称',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: '角色值',
    width: 180,
    dataIndex: 'value',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
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
      const enable = ~~record.status === 1;
      return <Tag color={enable ? 'green' : 'red'}>{enable ? '启用' : '停用'}</Tag>;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];
