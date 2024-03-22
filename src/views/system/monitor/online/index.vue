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
  >
    <template #toolbar>
      <a-switch
        v-model:checked="realTimeUpdate"
        checked-children="开启实时更新"
        un-checked-children="关闭实时更新"
      />
    </template>
  </DynamicTable>
</template>

<script setup lang="tsx">
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import { baseColumns, type TableListItem } from './columns';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { Api } from '@/api/';
  import { useSSEStore } from '@/store/modules/sse';

  defineOptions({
    name: 'SystemMonitorOnline',
  });

  let originList: TableListItem[] = [];
  const realTimeUpdate = ref(true);
  const list = ref<TableListItem[]>([]);
  const loading = ref(false);
  const sseStore = useSSEStore();
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

  const onOnlineUserChange = () => {
    if (realTimeUpdate.value) {
      handleReload();
    }
  };

  watch(realTimeUpdate, (val) => {
    val && handleReload();
  });

  onMounted(() => {
    handleReload();
    sseStore.emitter.on('onlineUser', onOnlineUserChange);
  });

  onBeforeUnmount(() => {
    sseStore.emitter.off('onlineUser', onOnlineUserChange);
  });
</script>
