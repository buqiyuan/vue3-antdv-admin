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
        :customRow="customRow"
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
  import { useContextMenu } from '@/hooks/functions/useContextMenu';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const [createContextMenu] = useContextMenu();

  const customRow = (record) => {
    return {
      onContextmenu: (e: MouseEvent) => {
        createContextMenu({
          event: e,
          items: [
            {
              label: '查看',
              handler: () => {
                console.log('record', record);
                router.push({ name: 'demos-table-lol-info', params: { id: record.heroId } });
              },
            },
            {
              label: '编辑',
              handler: () => {
                console.log('record', record);
              },
            },
          ],
        });
      },
    };
  };

  const loadData = async (params) => {
    const { data } = await getLolHeroList(params);
    return data;
  };
</script>

<style lang="less" scoped></style>
