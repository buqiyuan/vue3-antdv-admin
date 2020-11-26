<template>
  <a-input-number
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"/>
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {InputNumber} from 'ant-design-vue'
import {FormItem} from "@/types/schema";

export default defineComponent({
  name: 'schema-form-input-number',
  emits: ['update:value'],
  components: {
    [InputNumber.name]: InputNumber
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
