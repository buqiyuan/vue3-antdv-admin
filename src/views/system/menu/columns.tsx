import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { Icon } from '@/components/basic/icon';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.MenuItemInfo;
export type TableColumnItem = TableColumn<TableListItem>;

/**
 * 将对应菜单类型转为字符串字意
 */
const getMenuType = (type) => {
  switch (type) {
    case 0:
      return <Tag color="warning">目录</Tag>;
    case 1:
      return <Tag color="success">菜单</Tag>;
    case 2:
      return <Tag color="error">权限</Tag>;
    default:
      return '';
  }
};

export const baseColumns: TableColumnItem[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    fixed: 'left',
    width: 200,
  },
  {
    title: '图标',
    width: 40,
    dataIndex: 'icon',
    hideInSearch: true,
    customRender: ({ record }) => record.icon && <Icon icon={record.icon} size="22" />,
  },
  {
    title: '类型',
    width: 80,
    dataIndex: 'type',
    hideInSearch: true,
    customRender: ({ record }) => getMenuType(record.type),
  },
  {
    title: '节点路由',
    dataIndex: 'path',
    width: 180,
    ellipsis: true,
  },
  {
    title: '文件路径',
    width: 180,
    dataIndex: 'component',
  },
  {
    title: '权限标识',
    width: 180,
    dataIndex: 'permission',
    hideInSearch: true,
    customRender: ({ record }) =>
      record.permission && <Tag color="processing">{record.permission}</Tag>,
  },
  {
    title: '排序',
    width: 50,
    dataIndex: 'orderNo',
    hideInSearch: true,
  },
  {
    title: '路由缓存',
    dataIndex: 'keepalive',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => record.type === 1 && (record.keepAlive ? '是' : '否'),
  },
  {
    title: '是否显示',
    dataIndex: 'show',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => {
      const show = record.show;
      const enable = ~~show === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '显示' : '隐藏';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: '更新时间',
    width: 180,
    dataIndex: 'updatedAt',
    hideInSearch: true,
    customRender({ text }) {
      return formatToDateTime(text);
    },
  },
];
