import type { TableColumn } from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.ParamConfigEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 60,
  },
  {
    title: '参数名称',
    width: 150,
    dataIndex: 'name',
  },
  {
    title: 'key',
    dataIndex: 'key',
  },
  {
    title: 'value',
    dataIndex: 'value',
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
    label: '名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
