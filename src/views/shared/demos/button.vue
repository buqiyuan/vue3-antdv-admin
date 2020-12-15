<template>
  <div>
    <a-alert
        message="可扩展antd按钮样式功能"
        description="继承自原ant-design-vue的a-button，轻易扩展按钮的type定制不同颜色，详细看@/components/button/button.vue"
        type="info"
        show-icon
        style="margin-bottom: 12px"
    />
    <a-card>
      <div class="btn-rows">
        <a-button type="primary">primary</a-button>
        <a-button type="warning">warning</a-button>
        <a-button type="success">success</a-button>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {Alert,Card} from 'ant-design-vue'
import {AButton} from '@/components/button'

/**
 * @description 扩展ant-design-vue模态框功能
 */
export default defineComponent({
  name: "custom-button",
  components: { [Alert.name]: Alert, [Card.name]: Card, AButton},
})
</script>

<style lang="scss" scoped>
.btn-rows {
  button {
    margin-right: 12px;
  }
}
</style>
