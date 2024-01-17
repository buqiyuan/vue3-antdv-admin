import type { TableColumn } from '@/components/core/dynamic-table';
import { Icon } from '@/components/basic/icon';

export type TableListItem = API.MenuItemInfo;
export type TableColumnItem = TableColumn<TableListItem>;

/**
 * 将对应菜单类型转为字符串字意
 */
const getMenuType = (type) => {
  switch (type) {
    case 0:
      return '目录';
    case 1:
      return '菜单';
    case 2:
      return '权限';
    default:
      return '';
  }
};

export const baseColumns: TableColumnItem[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 240,
    fixed: 'left',
  },
  {
    title: '图标',
    width: 80,
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

    width: 240,
  },
  {
    title: '路由缓存',
    dataIndex: 'keepalive',

    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => record.type === 1 && (record.keepAlive ? '是' : '否'),
  },
  {
    title: '文件路径',
    width: 280,

    dataIndex: 'component',
  },
  {
    title: '权限',
    width: 300,

    dataIndex: 'permission',
  },
  {
    title: '排序号',
    width: 80,

    dataIndex: 'orderNo',
    hideInSearch: true,
  },
  {
    title: '更新时间',
    width: 180,

    dataIndex: 'updatedAt',
    hideInSearch: true,
  },
];
