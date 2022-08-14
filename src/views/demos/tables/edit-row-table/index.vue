<template>
  <div>
    <Alert message="可编辑行表格" type="info" show-icon>
      <template #description> 可编辑行表格-可编辑行表格使用示例 </template>
    </Alert>
    <Card title="可编辑行表格基本使用示例" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :search="false"
        :columns="columns"
        row-key="id"
      >
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { Alert, Card } from 'ant-design-vue';
  import { columns, tableData } from './columns';
  import { useTable, type OnChangeCallbackParams } from '@/components/core/dynamic-table';

  defineOptions({
    name: 'EditRowTable',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const loadData = async (
    params,
    onChangeParams: OnChangeCallbackParams,
  ): Promise<API.TableListResult> => {
    console.log('onChangeParams', onChangeParams);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: tableData,
          ...params,
        });
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
      }, 500);
    });
  };
</script>

<style lang="less" scoped></style>
