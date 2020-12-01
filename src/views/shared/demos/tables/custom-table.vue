<template>
  <div>
    <a-alert
        message="封装ant-design-vue的表格"
        description="继承自原ant-design-vue的a-button，轻易扩展按钮的type定制不同颜色，详细看@/components/button/button.vue"
        type="info"
        show-icon
    />
    <a-card>
      <dynamic-table ref="tableRef" :columns="columns" rowKey="id">
        <template v-slot:title>
          <a-button type="primary">
            添加
          </a-button>
          <a-button  type="primary">
            删除
          </a-button>
        </template>
      </dynamic-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {Alert,Card} from 'ant-design-vue'
import {AButton} from '@/components/button'

/**
 * @description 扩展ant-design-vue表格功能
 */
export default defineComponent({
  name: "custom-modal",
  components: { [Alert.name]: Alert, [Card.name]: Card, AButton},
})
</script>

<style lang="scss" scoped>
</style>
