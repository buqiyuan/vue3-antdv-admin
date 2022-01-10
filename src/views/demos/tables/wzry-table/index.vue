<template>
  <div>
    <Alert message="游戏介绍" type="info" show-icon>
      <template #description> 《王者荣耀》-- 根据JSON格式的数据进行导出 </template>
    </Alert>
    <Card title="英雄列表mock数据" style="margin-top: 20px">
      <dynamic-table
        ref="dynamicTableRef"
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        rowKey="heroid"
        @toggle-advanced="toggleAdvanced"
      >
        <template #toolbar>
          <a-button type="primary" @click="defaultHeader"> 导出：默认头部 </a-button>
          <a-button type="primary" @click="customHeader"> 导出：自定义头部 </a-button>
        </template>
      </dynamic-table>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { Alert, Card } from 'ant-design-vue';
  import { DynamicTable, type DynamicTableInstance } from '@/components/core/dynamic-table';
  import { jsonToSheetXlsx } from '@/components/basic/excel';

  import { getWzryHeroList } from '@/api/demos/hero';
  import { columns } from './columns';
  import { ref } from 'vue';

  let tableData = [];

  const dynamicTableRef = ref<DynamicTableInstance>();

  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: tableData,
      filename: '使用key作为默认头部.xlsx',
    });
  }

  // 自定义头部
  function customHeader() {
    jsonToSheetXlsx({
      data: tableData,
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
      // dynamicTableRef.value?.getQueryFormRef().updateSchema([
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

  const loadData = async (params) => {
    const { data } = await getWzryHeroList(params);

    tableData = data.list;
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
    return data;
  };
</script>

<style lang="less" scoped></style>
