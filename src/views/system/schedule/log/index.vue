<template>
  <DynamicTable
    header-title="任务日志"
    :data-request="getTaskLogList"
    :search="false"
    :columns="columns"
  />
</template>

<script setup lang="tsx">
  import { Tag } from 'ant-design-vue';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { getTaskLogList } from '@/api/system/log';

  defineOptions({
    name: 'SystemScheduleTaskLog',
  });

  type TableListItem = API.TaskLogListItemResult;

  const [DynamicTable] = useTable();

  const getStatusType = (status) => {
    switch (status) {
      case 0:
        return 'danger';
      case 1:
        return 'success';
    }
  };
  const getStatusTip = (status) => {
    switch (status) {
      case 0:
        return '失败';
      case 1:
        return '成功';
    }
  };

  const columns: TableColumn<TableListItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '任务编号',
      dataIndex: 'taskId',
      align: 'center',
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '异常信息',
      dataIndex: 'detail',
      align: 'center',
      customRender: ({ record }) => record.detail ?? '无',
    },
    {
      title: '耗时',
      dataIndex: 'consumeTime',
      align: 'center',
      customRender: ({ record }) => <Tag>{record.consumeTime}ms</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      customRender: ({ record }) => (
        <Tag color={getStatusType(record.status)}>{getStatusTip(record.status)}</Tag>
      ),
    },
    {
      title: '执行时间',
      dataIndex: 'createdAt',
      align: 'center',
    },
  ];
</script>
