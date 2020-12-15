<template>
  <div>
    <a-alert
        message="验证表单"
        description="动态验证表单"
        type="info"
        show-icon
        style="margin-bottom: 12px"
    />
    <a-card>
      <schema-form ref="dynamicForm" :form-schema="formSchema">
        <template #operate-button>
          <a-button @click="confirm" type="primary">
            确定
          </a-button>
        </template>
      </schema-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue'
import {Alert,Card} from 'ant-design-vue'
import {AButton} from '@/components/button'
import {SchemaForm} from '@/components/JSON-schema-form'
import {getFormSchema} from './form-schema'

/**
 * @description 验证表单
 */
export default defineComponent({
  name: "rule-form",
  components: { [Alert.name]: Alert, [Card.name]: Card, AButton, SchemaForm},
  setup() {
    const dynamicForm = ref<any>(null)

    // 点击提交
    const confirm = () => dynamicForm.value.validate()

    return {
      dynamicForm,
      confirm,
      formSchema: getFormSchema(dynamicForm)
    }
  }
})
</script>

<style lang="scss" scoped>
.btn-rows {
  button {
    margin-right: 12px;
  }
}
</style>
