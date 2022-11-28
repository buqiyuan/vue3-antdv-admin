<template>
  <DynamicTable
    header-title="登录日志"
    auto-height
    :data-request="loadTableData"
    :columns="columns"
  />
</template>

<script setup lang="ts">
  import type { LoadDataParams, TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { getLoginLogList } from '@/api/system/log';

  defineOptions({
    name: 'SystemMonitorLoginLog',
  });

  const [DynamicTable] = useTable();

  const loadTableData = async ({ page, limit }: LoadDataParams) => {
    const data = await getLoginLogList({ page, limit });
    return data;
  };

  const columns: TableColumn[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 280,
      align: 'center',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
      width: 150,
      align: 'center',
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      align: 'center',
    },
    {
      title: '登录时间',
      dataIndex: 'time',
      align: 'center',
      formItemProps: {
        component: 'DatePicker',
        componentProps: {
          class: 'w-full',
        },
      },
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      align: 'center',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      align: 'center',
    },
  ];
</script>
