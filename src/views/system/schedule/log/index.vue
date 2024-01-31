<template>
  <DynamicTable
    header-title="任务日志"
    :data-request="Api.systemLog.logTaskList"
    :search="false"
    :columns="columns"
    size="middle"
  />
</template>

<script setup lang="tsx">
  import { Tag } from 'ant-design-vue';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import Api from '@/api/';
  import { formatToDateTime } from '@/utils/dateUtil';

  defineOptions({
    name: 'SystemScheduleTaskLog',
  });

  type TableListItem = API.TaskLogEntity;

  const [DynamicTable] = useTable();

  const getStatusType = (status) => {
    switch (status) {
      case 0:
        return 'red';
      case 1:
        return 'green';
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
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '任务编号',
      dataIndex: ['task', 'id'],
      width: 80,
    },
    {
      title: '任务名称',
      dataIndex: ['task', 'name'],
      width: 140,
    },
    {
      title: '异常信息',
      dataIndex: 'detail',
      customRender: ({ record }) => record.detail ?? '无',
    },
    {
      title: '耗时',
      dataIndex: 'consumeTime',
      width: 80,
      customRender: ({ record }) => <Tag>{record.consumeTime}ms</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      customRender: ({ record }) => {
        const status = ~~record.status;
        return <Tag color={getStatusType(status)}>{getStatusTip(status)}</Tag>;
      },
    },
    {
      title: '执行时间',
      dataIndex: 'createdAt',
      width: 165,
      customRender: ({ record }) => {
        return formatToDateTime(record.createdAt);
      },
    },
  ];
</script>
