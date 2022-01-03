<template>
  <div>
    <Alert message="游戏介绍" type="info" show-icon>
      <template #description> 英雄联盟 </template>
    </Alert>
    <Card title="英雄列表mock数据" style="margin-top: 20px">
      <dynamic-table
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        rowKey="heroid"
      />
    </Card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'DemosTablesLolTable',
  };
</script>

<script lang="ts" setup>
  import { Alert, Card } from 'ant-design-vue';
  import { DynamicTable } from '@/components/core/dynamic-table';
  import { getLolHeroList } from '@/api/demos/hero';
  import { columns } from './columns';

  const loadData = async (params) => {
    const { data } = await getLolHeroList(params);
    return data;
  };
</script>

<style lang="less" scoped></style>
