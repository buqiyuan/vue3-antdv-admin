import type { TableColumn } from '@/components/core/dynamic-table';
import { Badge, Tag } from 'ant-design-vue';

export type TableListItem = API.SysTaskListItem;
export type TableColumnItem = TableColumn<TableListItem>;

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return '#d9d9d9';
    case 1:
      return '#52c41a';
  }
};

const getStatusInfo = (status) => {
  switch (status) {
    case 0:
      return '停止';
    case 1:
      return '运行';
  }
};

export const baseColumns: TableColumnItem[] = [
  {
    title: '任务名称',
    dataIndex: 'name',
    width: 240,
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'status',
    align: 'center',
    bodyCell: ({ record }) => (
      <Badge
        status={record.status === 1 ? 'processing' : 'default'}
        color={getStatusColor(record.status)}
        text={getStatusInfo(record.status)}
      />
    ),
  },
  {
    title: '类型',
    width: 100,
    align: 'center',
    dataIndex: 'type',
    bodyCell: ({ record }) => (
      <Tag color={'processing'}>{record.type === 1 ? 'Interval' : 'Cron'}</Tag>
    ),
  },
  {
    title: '调用服务',
    dataIndex: 'service',
    hideInSearch: true,
    align: 'center',
    width: 350,
  },
  {
    title: '执行参数',
    dataIndex: 'data',
    align: 'center',
    hideInSearch: true,
    width: 450,
  },
  {
    title: '备注',
    width: 250,
    align: 'center',
    dataIndex: 'remark',
  },
];
