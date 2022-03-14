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
        row-key="heroid"
      />
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Alert, Card } from 'ant-design-vue';
  import { columns, tableData } from './columns';
  import { DynamicTable, type DynamicTableInstance } from '@/components/core/dynamic-table';

  const dynamicTableRef = ref<DynamicTableInstance>();

  const loadData = async (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: tableData,
          ...params,
        });
        // 手动设置搜索表单的搜索项
        dynamicTableRef.value?.getQueryFormRef()?.updateSchema([
          {
            field: 'price',
            componentProps: {
              options: [
                {
                  label: '0-199',
                  value: '0-199',
                },
                {
                  label: '200-999',
                  value: '200-999',
                },
              ],
            },
          },
        ]);
      }, 500);
    });
  };
</script>

<style lang="less" scoped></style>
