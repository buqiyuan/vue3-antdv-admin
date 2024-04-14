import { RouterLink } from 'vue-router';
import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import type { FunctionalComponent } from 'vue';
import { formatToDateTime } from '@/utils/dateUtil';
import router from '@/router';

export type TableListItem = API.DictTypeEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const dictItemRouteName = '/system/dict-item/:id';

const DictCodeRender: FunctionalComponent<TableListItem> = (props) => {
  if (!router.hasRoute(dictItemRouteName)) {
    return props.code;
  }
  return (
    <RouterLink to={{ name: dictItemRouteName, params: { id: props.id } }}>{props.code}</RouterLink>
  );
};

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
    customRender: ({ record }) => <DictCodeRender {...record} />,
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
