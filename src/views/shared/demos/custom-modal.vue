<template>
  <div>
    <a-alert
        message="自定义模态框"
        description="沿用ant-design-vue的modal样式，自定义一个可拖拽、可调整大小的模态框"
        type="info"
        show-icon
        style="margin-bottom: 12px"
    />
    <a-card>
      <a-button @click="visible = true" type="primary">弹出弹窗</a-button>
    </a-card>
    <a-custom-modal v-model:visible="visible" />
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {Alert,Card} from 'ant-design-vue'
import {ACustomModal} from '@/components/a-custom-modal'

/**
 * @description 扩展ant-design-vue模态框功能
 */
export default defineComponent({
  name: "custom-modal",
  components: { [Alert.name]: Alert, [Card.name]: Card, ACustomModal},
  setup() {
    const state = reactive({
      visible: false
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
