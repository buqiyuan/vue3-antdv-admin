<template>
  <div class="icons-box">
    <a-card>
      <template #title>
        菜单图标（<a :href="`${prefix}iconfont.js`">/public/iconfont.js</a>）
      </template>
      <template v-for="iconItem in icons" :key="iconItem.code">
        <a-card-grid @click="copyIcon(iconItem)">
          <div>
            <icon-font :type="iconItem.code" size="26"></icon-font>
          </div>
          <div>{{ iconItem.title }}</div>
          <div>{{ iconItem.code }}</div>
        </a-card-grid>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Card, message} from 'ant-design-vue'
import {IconFont} from '@/components/iconfont'
import icons from "./icons";
import {copyText} from '@/utils/common'

const prefix = process.env.BASE_URL

export default defineComponent({
  name: "icons",
  components: {IconFont, [Card.name]: Card, [Card.Grid.name]: Card.Grid},
  setup() {

    const copyIcon = async (iconItem) => {
      await copyText(iconItem.code)
      message.success(iconItem.code + '--复制成功！')
    }

    return {
      icons,
      prefix,
      copyIcon
    }
  }
})
</script>

<style lang="scss" scoped>
.icons-box {
  display: flex;
  justify-content: center;
  ::v-deep(.ant-card) {
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
