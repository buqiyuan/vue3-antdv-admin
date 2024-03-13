<template>
  <DynamicTable
    row-key="tokenId"
    header-title="在线用户"
    title-tooltip="这是真实操作，请不要随意将其他用户踢下线。"
    :data-source="list"
    :columns
    :loading
    @change="handleChange"
    @search="handleSearch"
    @reload="handleReload"
  />
</template>

<script setup lang="tsx">
  import { ref, onMounted } from 'vue';
  import { baseColumns, type TableListItem } from './columns';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { Api } from '@/api/';

  defineOptions({
    name: 'SystemMonitorOnline',
  });

  let originList: TableListItem[] = [];
  const list = ref<TableListItem[]>([]);
  const loading = ref(false);

  const [DynamicTable, dynamicTableInstance] = useTable({ size: 'small' });

  const columns: TableColumn<TableListItem>[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 80,
      dataIndex: 'ACTION',
      actions: ({ record }) => [
        {
          label: '下线',
          auth: 'system:online:kick',
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
    await Api.systemOnline.onlineKick({ tokenId: record.tokenId });
    dynamicTableInstance.reload();
  };

  const handleChange = (...a) => {
    console.log(...a);
  };

  const handleSearch = (params: TableListItem) => {
    const keys = Object.keys(params);
    if (!keys.some((k) => Boolean(params[k]))) {
      handleReload();
      return;
    }
    list.value = originList.filter((item) => {
      return keys.every((k) => !params[k] || item[k].includes(params[k]));
    });
  };

  const handleReload = async () => {
    loading.value = true;
    originList = await Api.systemOnline.onlineList().finally(() => (loading.value = false));
    list.value = originList;
  };

  onMounted(() => {
    handleReload();
  });
</script>
