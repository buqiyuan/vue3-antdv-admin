<template>
  <Card class="header-item-card" hoverable>
    <div class="title">{{ title }}</div>
    <Statistic class="value" :value="value" :duration="2000" />
    <span class="suffix">{{ suffix }}</span>
  </Card>
</template>

<script lang="ts" setup>
  import { Card, Statistic } from 'ant-design-vue';

  defineOptions({
    name: 'OverviewHeaderItem',
  });

  defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    suffix: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="less" scoped>
  .header-item-card {
    flex: 1;
    margin-left: 20px;
    overflow-y: hidden;

    .title {
      font-size: 12px;
      color: #999;
    }

    .value {
      display: inline-block;
      margin: 10px 0;
      height: 40px;
      font-weight: 500;
      font-size: 24px;
      line-height: 40px;
    }

    .suffix {
      display: inline-block;
      font-size: 14px;
      margin-left: 5px;
      color: #6d6d6d;
    }
  }
</style>
