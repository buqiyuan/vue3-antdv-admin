<template>
  <a-form v-bind="formSchema.formItemLayout || formItemLayout">
    <template v-for="(formItem, index) in formSchema.formItem.filter(item => !item.hidden)"
              :key="formItem.field">
      <a-form-item
          :help="formItem.help"
          :extra="formItem.extra"
          v-bind="validateInfos[formItem.field]"
          :label="formItem.label"
      >
        <a-spin :spinning="formItem.loading || false">
          <component
              style="min-height: 40px"
              v-model:value="modelRef[formItem.field]"
              :form-item="formItem"
              :is="getComponent(formItem.type)"/>
        </a-spin>
      </a-form-item>
    </template>
  </a-form>
</template>

<script lang="ts">
import {defineComponent, reactive, getCurrentInstance, isReactive, isRef, createVNode, watch} from 'vue'
import {Form, Spin} from 'ant-design-vue'
import {useForm} from "@ant-design-vue/use";
import {isString, isFunction, isAsyncFunction} from '@/utils/is'
import components from './components'
import {FormItem, FormSchema} from "@/types/schema";

export default defineComponent({
  name: "dynamic-form",
  components: {
    ...components,
    [Spin.name]: Spin,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
  },
  props: {
    formSchema: { // 动态验证表单
      required: true,
      type: [Object]
    } as any,
    fields: { // 预置字段默认值
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    // 表单实例
    const formInstance = getCurrentInstance()

    // 表单布局
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }

    // 表单项
    const modelRef = reactive(props.formSchema.formItem.reduce((previousValue, currentValue) => {
      currentValue.eventObject ??= {}
      // Object.keys(currentValue.eventObject).forEach(key => {
      //   const fn = currentValue.eventObject[key]
      //   currentValue.eventObject[key] = (...rest) => {
      //     fn(...rest, formInstance)
      //   }
      // })
      previousValue[currentValue.field] = currentValue.value
      return previousValue
    }, {}))
    // 如果有默认值，则覆盖
    props.fields && Object.assign(modelRef, props.fields)

    // 异步设置默认数据
    props.formSchema.formItem.forEach(async (item: FormItem) => {
      // 是否需要loading
      if (item?.hasOwnProperty('loading')) {
        item.loading = true
      }
      // 异步选项
      if (isFunction(item.asyncOptions) || isAsyncFunction(item.asyncOptions)) {
        item.options = await item.asyncOptions(item, formInstance).finally(() => item.loading = false)
      } else if (isFunction(item.asyncValue) || isAsyncFunction(item.asyncValue)) { // 异步默认值
        modelRef[item.field] = await item.asyncValue(item, formInstance).finally(() => item.loading = false)
      }
    })

    // 生成表单验证规则
    const rulesRef = reactive(props.formSchema.formItem.filter(item => !item.hidden).reduce((previousValue, currentValue) => {
      currentValue.rules && (previousValue[currentValue.field] = currentValue.rules)
      return previousValue
    }, {}))

    // console.log(modelRef, '表单')
    // console.log(rulesRef, '表单验证规则')

    // const watchCallback = props.formSchema.watchCallback ?? (() => ({}))
    //
    // // 是否有需要监测的字段
    // props.formSchema.watchKeys && watch(props.formSchema.watchKeys.map(item => () => modelRef[item]), (curr, prev) => watchCallback(curr, {
    //   dynamicForm: props.formSchema,
    //   modelRef
    // }))
    // watch(props.formSchema.watchKeys.map(item => () => modelRef[item]), eval(props.formSchema.watchCallback))

    const {resetFields, validate, validateInfos} = useForm(modelRef, rulesRef);

    const preset = ['input', 'textarea', 'select', 'radio', 'checkbox', 'input-number', 'input-range', 'switch']

    // 获取组件名称
    const getComponent = (type) => {
      // 预设组件
      if (preset.includes(type)) {
        return 'schema-form-' + type
      } else if (isReactive(type) || isRef(type)) { // 自定义组件
        return createVNode(type)
      } else { // 不识别组件
        return type
      }
    }

    return {
      formItemLayout,
      validate,
      isString,
      getComponent,
      validateInfos,
      modelRef,
    }
  }
})
</script>

<style lang="scss" scoped>
.ant-form {
  .ant-input-group {
    display: flex;
  }

  .ant-checkbox-wrapper {
    //margin-left: 0;
  }
}
</style>
