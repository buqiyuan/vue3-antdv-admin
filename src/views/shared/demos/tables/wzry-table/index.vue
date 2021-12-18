<template>
  <div>
    <Alert message="游戏介绍" type="info" show-icon>
      <template #description>
        《王者荣耀》是腾讯第一5V5团队公平竞技手游，国民MOBA手游大作！5V5王者峡谷、公平对战、还原MOBA经典体验；契约之战、五军对决、边境突围等，带来花式作战乐趣！
        10秒实时跨区匹配，与好友开黑上分，向最强王者进击！多款英雄任凭选择，一血、五杀、超神，实力碾压，收割全场！敌军即将到达战场，王者召唤师快来集结好友，准备团战，就在《王者荣耀》！
        <div>
          ① 英雄列表接口1：
          <a href="https://pvp.qq.com/web201605/js/herolist.json" target="_blank">
            https://pvp.qq.com/web201605/js/herolist.json
          </a>
        </div>
        <div>
          ② 英雄介绍以及技能描述接口：
          <a href="https://pvp.qq.com/story201904/index.html#/heroDetail/index/111" target="_blank">
            https://pvp.qq.com/web201605/herodetail/+（ename）+.shtml
          </a>
        </div>
        <div>
          ③ 英雄列表接口2：
          <a
            href="https://pvp.qq.com/webplat/info/news_version3/15592/18024/23901/24397/24398/m17330/list_1.shtml?callback=createHeroList"
            target="_blank"
          >
            https://pvp.qq.com/webplat/info/news_version3/15592/18024/23901/24397/24398/m17330/list_1.shtml?callback=createHeroList
          </a>
        </div>
      </template>
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

<script lang="ts" setup>
  import { Alert, Card } from 'ant-design-vue';
  import { DynamicTable } from '@/components/dynamic-table';
  import { getHeroList } from '@/api/demos/hero';
  import { columns } from './columns';

  const loadData = async (params) => {
    const { data } = await getHeroList(params);
    return data;
  };
</script>

<style lang="less" scoped></style>
