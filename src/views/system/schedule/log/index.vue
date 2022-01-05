<template>
  <DynamicTable
    header-title="任务日志"
    :data-request="getTaskLogList"
    :search="false"
    :columns="columns"
  />
</template>

<script lang="tsx">
  export default { name: 'SystemScheduleTaskLog' };
</script>

<script setup lang="tsx">
  import { DynamicTable, TableColumn } from '@/components/core/dynamic-table';
  import { getTaskLogList } from '@/api/system/log';
  import { Tag } from 'ant-design-vue';

  type TableListItem = API.TaskLogListItemResult;

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
      bodyCell: ({ record }) => <>{record.detail ?? '无'}</>,
    },
    {
      title: '耗时',
      dataIndex: 'consumeTime',
      align: 'center',
      bodyCell: ({ record }) => <Tag>{record.consumeTime}ms</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      bodyCell: ({ record }) => (
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
