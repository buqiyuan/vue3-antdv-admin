<template>
  <a-radio-group v-model:value="modelValue" v-on="formItem.eventObject">
    <template v-for="option in formItem.options" :key="option.value">
      <a-radio :value="option.value">
        {{ option.label }}
      </a-radio>
    </template>
  </a-radio-group>
</template>
<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {Radio} from 'ant-design-vue'
import {FormItem} from "@/types/schema";

export default defineComponent({
  name: 'schema-form-radio',
  emits: ['update:value'],
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
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
