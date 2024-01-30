<template>
  <div>
    <Alert message="查询表格" type="info" show-icon>
      <template #description> 查询表格-查询表单使用示例 </template>
    </Alert>
    <Card title="查询表单基本使用示例" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        row-key="id"
        @resize-column="handleResizeColumn"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ record.name }} <a class="text-red-500">[测试bodyCell]</a>
          </template>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { Alert, Card } from 'ant-design-vue';
  import { columns, tableData } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { waitTime } from '@/utils/common';

  const [DynamicTable, dynamicTableInstance] = useTable();

  const loadData = async (params): Promise<API.TableListResult> => {
    console.log('params', params);
    await waitTime(500);

    // 手动设置搜索表单的搜索项
    dynamicTableInstance?.getQueryFormRef()?.updateSchema?.([
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

    return {
      ...params,
      items: tableData,
    };
  };

  const handleResizeColumn = (w, col) => {
    // console.log('w', w, col);
    col.width = w;
  };
</script>

<style lang="less" scoped></style>
