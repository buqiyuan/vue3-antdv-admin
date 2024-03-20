<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="存储管理"
      :data-request="Api.toolsStorage.storageList"
      :columns="baseColumns"
      bordered
      size="small"
    >
      <template #toolbar>
        <UploadModal @upload-success="handleUploadSuccess" />
        <a-popconfirm
          title="你确定要删除这些数据吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete"
        >
          <a-button :disabled="!$auth('tool:storage:delete') || !checkedKeys.length" type="error">
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { baseColumns, searchFormSchema } from './columns';
  import UploadModal from './upload-modal.vue';
  import { useTable } from '@/components/core/dynamic-table';
  import Api from '@/api/';

  defineOptions({
    name: 'ToolsStorage',
  });

  const checkedKeys = ref<Array<number>>([]);

  const [DynamicTable, dynamicTableInstance] = useTable({
    formProps: {
      schemas: searchFormSchema,
    },
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys: checkedKeys as unknown as Key[],
      onSelect: (record, selected) => {
        if (selected) {
          checkedKeys.value = [...checkedKeys.value, record.id];
        } else {
          checkedKeys.value = checkedKeys.value.filter((id) => id !== record.id);
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        const changeIds = changeRows.map((item) => item.id);
        if (selected) {
          checkedKeys.value = [...checkedKeys.value, ...changeIds];
        } else {
          checkedKeys.value = checkedKeys.value.filter((id) => {
            return !changeIds.includes(id);
          });
        }
      },
    },
  });

  const handleUploadSuccess = () => {
    dynamicTableInstance?.reload();
  };

  const handleDelete = async () => {
    await Api.toolsStorage.storageDelete({ ids: checkedKeys.value });
    checkedKeys.value = [];
    dynamicTableInstance?.reload();
  };
</script>
