import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.OnlineUserInfo;

export const baseColumns: TableColumn<TableListItem>[] = [
  {
    title: '会话编号',
    dataIndex: 'tokenId',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    customRender: ({ record }) => (
      <div>
        <span class="pr-4px">{record.username}</span>
        {record.isCurrent && <Tag color="processing">我</Tag>}
      </div>
    ),
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
  },
  {
    title: '登录IP',
    dataIndex: 'ip',
    width: 140,
  },
  {
    title: '登录地点',
    dataIndex: 'address',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
  },
  {
    title: '登录时间',
    dataIndex: 'time',
    width: 180,
    customRender: ({ record }) => formatToDateTime(record.time),
  },
];
