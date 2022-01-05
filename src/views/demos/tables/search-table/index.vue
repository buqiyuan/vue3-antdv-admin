<template>
  <div>
    <Alert message="查询表格" type="info" show-icon>
      <template #description> 查询表格-查询表单使用示例 </template>
    </Alert>
    <Card title="查询表单基本使用示例" style="margin-top: 20px">
      <dynamic-table
        ref="dynamicTableRef"
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        rowKey="heroid"
        @toggle-advanced="toggleAdvanced"
      />
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { Alert, Card } from 'ant-design-vue';
  import { DynamicTable, type DynamicTableInstance } from '@/components/core/dynamic-table';
  import { columns, tableData } from './columns';
  import { ref } from 'vue';

  const dynamicTableRef = ref<DynamicTableInstance>();

  // 展开搜索表单时更新英雄皮肤选项值
  const toggleAdvanced = (e) => {
    if (e) {
      dynamicTableRef.value?.getQueryFormRef().updateSchema([
        {
          field: 'skin_name',
          componentProps: {
            options: [
              {
                label: '皮肤1',
                value: 'aa',
              },
              {
                label: '皮肤2',
                value: 'bb',
              },
            ],
          },
        },
      ]);
    }
  };

  const loadData = async (params) => {
    return {
      list: tableData,
      ...params,
    };
  };
</script>

<style lang="less" scoped></style>
