<template>
  <a-textarea
      v-model:value="modelValue"
      v-on="formItem.eventObject"
      v-bind="formItem.props"/>
</template>
<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {Input} from 'ant-design-vue'
import {FormItem} from "@/types/schema";

export default defineComponent({
  name: 'schema-form-textarea',
  emits: ['update:value'],
  components: {
    [Input.TextArea.name]: Input.TextArea,
  },
  props: {
    formItem: { // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  setup(props, {attrs, emit}) {

    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    return {
      modelValue
    }
  }
})
</script>
