import type { TableColumn } from '@/components/dynamic-table';

export const columns: TableColumn[] = [
  {
    title: '卡类',
    align: 'center',
    fixed: 'left',
    dataIndex: 'cardyltype_name',
  },
  {
    title: '售卡数量',
    align: 'center',
    fixed: 'left',
    dataIndex: 'sksl',
  },
  {
    title: '售卡工本费',
    align: 'center',
    dataIndex: 'skssje',
  },
  {
    title: '钱包充值次数',
    align: 'center',
    dataIndex: 'czqbnum_add',
  },
  {
    title: '钱包充值金额',
    align: 'center',
    dataIndex: 'czqbssje_add',
  },
  {
    title: '钱包冲正次数',
    align: 'center',
    dataIndex: 'czqbnum_sub',
  },
  {
    title: '钱包冲正金额',
    align: 'center',
    dataIndex: 'czqbssje_sub',
  },
  {
    title: '月票充值金额',
    align: 'center',
    dataIndex: 'czypssje_add',
  },
  {
    title: '月票冲正金额',
    align: 'center',
    dataIndex: 'czypssje_sub',
  },
  {
    title: '退卡数量',
    align: 'center',
    dataIndex: 'tksl',
  },
  {
    title: '实退金额',
    align: 'center',
    dataIndex: 'tkssje',
  },
  {
    title: '结转数量',
    align: 'center',
    dataIndex: 'jzsl',
  },
  {
    title: '补卡数量',
    align: 'center',
    dataIndex: 'bksl',
  },
  {
    title: '补卡实收金额',
    align: 'center',
    dataIndex: 'bkssje',
  },
  {
    title: '年审数量',
    align: 'center',
    dataIndex: 'nssl',
  },
  {
    title: '年审实收金额',
    align: 'center',
    dataIndex: 'nsssje',
  },
  {
    title: '转卡数量',
    align: 'center',
    dataIndex: 'zksl',
  },
  {
    title: '转卡金额',
    align: 'center',
    dataIndex: 'zkssje',
  },
  {
    title: '汇总日期',
    align: 'center',
    fixed: 'right',
    width: 200,
    dataIndex: 'hzrqStr',
  },
];
