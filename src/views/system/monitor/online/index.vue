<template>
  <DynamicTable
    ref="dynamicTableRef"
    header-title="在线用户"
    title-tooltip="这是真实操作，请不要随意将其他用户踢下线。"
    :data-request="getOnlineList"
    :columns="columns"
  />
</template>

<script lang="tsx">
  export default { name: 'SystemMonitorOnline' };
</script>

<script setup lang="tsx">
  import { ref } from 'vue';
  import { DynamicTable, TableColumn, DynamicTableInstance } from '@/components/core/dynamic-table';
  import { getOnlineList, kickUser } from '@/api/system/online';
  import { Tag } from 'ant-design-vue';
  import { useSocket } from '@/core/socket/useSocket';

  const dynamicTableRef = ref<DynamicTableInstance>();

  useSocket({
    connect() {
      // connect auto refresh
      dynamicTableRef.value?.refreshTable();
    },
    online() {
      // online event auto refresh
      dynamicTableRef.value?.refreshTable();
    },
    offline() {
      dynamicTableRef.value?.refreshTable();
    },
  });

  type TableListItem = API.OnlineUserListItem;

  const columns: TableColumn<TableListItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
      bodyCell: ({ record }) => (
        <>
          <span class="pr-16px">{record.username}</span>
          {record.isCurrent && <Tag color={'red'}>当前</Tag>}
        </>
      ),
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
      width: 140,
      align: 'center',
    },
    {
      title: '登录时间',
      dataIndex: 'time',
      align: 'center',
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
    {
      title: '操作',
      dataIndex: '$action',
      align: 'center',
      actions: ({ record }) => [
        {
          label: '下线',
          auth: 'sys.online.kick',
          disabled: record.disable,
          popConfirm: {
            title: '确定下线该用户吗?',
            onConfirm: () => handleKick(record),
          },
        },
      ],
    },
  ];

  const handleKick = async (record: TableListItem) => {
    await kickUser({ id: record.id });
  };
</script>
