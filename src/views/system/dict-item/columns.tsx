import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.DictItemEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 60,
  },
  {
    title: '字典项键名',
    dataIndex: 'label',
  },
  {
    title: '字典项值',
    dataIndex: 'value',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
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

export const getSearchFormSchemas = (
  dictTypeList: any[],
  onChange: (value) => any,
): FormSchema[] => [
  {
    field: 'typeId',
    label: '字典类型',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: dictTypeList,
      onChange,
    },
  },
  {
    field: 'label',
    label: '字典项键名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'value',
    label: '字典项值',
    component: 'Input',
    colProps: { span: 8 },
  },
];
