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
      color: #999;
      font-size: 12px;
    }

    .value {
      display: inline-block;
      height: 40px;
      margin: 10px 0;
      font-size: 24px;
      font-weight: 500;
      line-height: 40px;
    }

    .suffix {
      display: inline-block;
      margin-left: 5px;
      color: #6d6d6d;
      font-size: 14px;
    }
  }
</style>
