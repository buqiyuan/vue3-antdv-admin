<template>
  <DynamicTable
    header-title="请求日志"
    title-tooltip="这是mock数据"
    :data-request="getReqLogList"
    :columns="columns"
  />
</template>

<script lang="tsx">
  export default { name: 'SystemMonitorReqLog' };
</script>

<script setup lang="tsx">
  import { DynamicTable, TableColumn } from '@/components/core/dynamic-table';
  import { Tag } from 'ant-design-vue';
  import { getReqLogList } from '@/api/system/log';

  const getStatusType = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'success';
    } else if (status >= 300 && status < 400) {
      return 'default';
    } else if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'default';
    }
  };

  const getConsumeTimeType = (time: number) => {
    if (time <= 20) {
      return 'success';
    } else if (time <= 40) {
      return 'warning';
    } else {
      return 'error';
    }
  };

  const columns: TableColumn<API.ReqLogListItemResult>[] = [
    {
      title: '请求IP',
      dataIndex: 'ip',
      width: 150,
      align: 'center',
    },
    {
      title: '操作人ID',
      dataIndex: 'userId',
      align: 'center',
      width: 100,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      align: 'center',
      bodyCell: ({ record }) => <Tag color="processing">{record.method}</Tag>,
    },
    {
      title: '请求参数',
      dataIndex: 'params',
      align: 'center',
      ellipsis: true,
      width: 150,
    },
    {
      title: '请求地址',
      dataIndex: 'action',
      align: 'center',
    },
    {
      title: '响应状态',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      bodyCell: ({ record }) => <Tag color={getStatusType(record.status)}>{record.status}</Tag>,
    },
    {
      title: '耗时',
      dataIndex: 'consumeTime',
      align: 'center',
      width: 120,
      bodyCell: ({ record }) => (
        <Tag color={getConsumeTimeType(record.consumeTime)}>{`${record.consumeTime}ms`}</Tag>
      ),
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 220,
    },
  ];
</script>
