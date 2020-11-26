<template>
  <a-input
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
      autocomplete="new-password"/>
</template>
<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {Input} from 'ant-design-vue'
import {FormItem} from "@/types/schema";

export default defineComponent({
  name: 'schema-form-input',
  emits: ['update:value'],
  components: {
    [Input.name]: Input
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
