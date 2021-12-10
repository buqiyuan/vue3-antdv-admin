<template>
  <DynamicTable :load-data="loadTableData" :columns="columns">
    <template #method="{ record }">
      <Tag color="processing">{{ record.method }}</Tag>
    </template>
  </DynamicTable>
</template>

<script lang="tsx">
  export default { name: 'ReqLog' };
</script>

<script setup lang="tsx">
  import { DynamicTable, LoadDataParams, TableColumn } from '@/components/dynamic-table';
  import { Tag } from 'ant-design-vue';
  import { getReqLogList } from '@/api/system/log';

  const loadTableData = async ({ page, limit }: LoadDataParams) => {
    // mock数据
    const { data } = await getReqLogList({ page, limit });
    return data;
  };

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
      slots: {
        customRender: 'method',
        // 不使用render就默认开始slot，见上面模板
        // render: ({ method }) => <Tag color="processing">{method}</Tag>
      },
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
      slots: {
        customRender: 'status',
        render: ({ status }) => <Tag color={getStatusType(status)}>{status}</Tag>,
      },
    },
    {
      title: '耗时',
      dataIndex: 'consumeTime',
      align: 'center',
      width: 120,
      slots: {
        customRender: 'consumeTime',
        render: ({ consumeTime }) => (
          <Tag color={getConsumeTimeType(consumeTime)}>{`${consumeTime}ms`}</Tag>
        ),
      },
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 220,
    },
  ];
</script>
