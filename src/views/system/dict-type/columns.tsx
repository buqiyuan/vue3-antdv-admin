import { RouterLink } from 'vue-router';
import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.DictTypeEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 60,
  },
  {
    title: '字典名称',
    dataIndex: 'name',
  },
  {
    title: '字典编码',
    dataIndex: 'code',
    customRender: ({ record }) => (
      <RouterLink to={{ name: '字典项管理', params: { id: record.id } }}>{record.code}</RouterLink>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    width: 160,

    customRender: ({ record }) => formatToDateTime(record.createdAt),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '字典编码',
    component: 'Input',
    colProps: { span: 8 },
  },
];
