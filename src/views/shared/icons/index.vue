<template>
  <div class="icons-box">
    <Card>
      <template #title>
        菜单图标（<a :href="`${prefix}iconfont.js`">/public/iconfont.js</a>）
      </template>
      <template v-for="iconItem in icons" :key="iconItem.code">
        <CardGrid @click="copyIcon(iconItem)">
          <div>
            <icon-font :type="iconItem.code" size="26" />
          </div>
          <div>{{ iconItem.title }}</div>
          <div>{{ iconItem.code }}</div>
        </CardGrid>
      </template>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card, message } from 'ant-design-vue';
  import { IconFont } from '@/components/iconfont';
  import { copyText } from '@/utils/common';
  import icons from './icons';

  const CardGrid = Card.Grid;
  const prefix = process.env.BASE_URL;

  async function copyIcon(iconItem) {
    await copyText(iconItem.code);
    message.success(iconItem.code + '--复制成功！');
  }
</script>

<style lang="less" scoped>
  .icons-box {
    display: flex;
    justify-content: center;

    :deep(.ant-card) {
      max-width: 80vw;

      .ant-card-body {
        display: flex;
        flex-wrap: wrap;

        .ant-card-grid {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 20%;

          .anticon {
            margin-bottom: 14px;
          }
        }
      }
    }
  }
</style>
