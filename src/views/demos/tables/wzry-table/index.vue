<template>
  <Card title="英雄列表mock数据" style="margin-top: 20px">
    <DynamicTable
      ref="dynamicTableRef"
      size="small"
      bordered
      :data-request="getWzryHeroList"
      :columns="columns"
      row-key="heroid"
      @toggle-advanced="toggleAdvanced"
    >
      <template #toolbar>
        <a-button type="primary" @click="defaultHeader"> 导出：默认头部 </a-button>
        <a-button type="primary" @click="customHeader"> 导出：自定义头部 </a-button>
      </template>
    </DynamicTable>
  </Card>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { columns } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { jsonToSheetXlsx } from '@/components/basic/excel';

  import { getWzryHeroList } from '@/api/demo/hero';

  const [DynamicTable, dynamicTableInstance] = useTable();

  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: dynamicTableInstance.tableData,
      filename: '使用key作为默认头部.xlsx',
    });
  }

  // 自定义头部
  function customHeader() {
    jsonToSheetXlsx({
      data: dynamicTableInstance.tableData,
      header: {
        heroid: 'ID',
        cname: '英雄名称',
        title: '英雄称号',
        occupation: '定位',
        skin_name: '皮肤',
      },
      filename: '自定义头部.xlsx',
      json2sheetOpts: {
        // 指定顺序
        header: ['cname', 'heroid'],
      },
    });
  }

  // 展开搜索表单时更新英雄皮肤选项值
  const toggleAdvanced = (e) => {
    if (e) {
      //dynamicTableInstance?.getQueryFormRef().updateSchema([
      //   {
      //     field: 'skin_name',
      //     componentProps: {
      //       options: [
      //         {
      //           label: '皮肤1',
      //           value: 'aa',
      //         },
      //         {
      //           label: '皮肤2',
      //           value: 'bb',
      //         },
      //       ],
      //     },
      //   },
      // ]);
    }
  };
</script>

<style lang="less" scoped></style>
