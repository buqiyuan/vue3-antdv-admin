<template>
  <a-form v-bind="dynamicValidateForm.formItemLayout">
    <template v-for="(formItem, index) in dynamicValidateForm.formItem.filter(item => !item.hidden)"
              :key="formItem.field">
      <a-form-item
          :help="formItem.help"
          :extra="formItem.extra"
          v-bind="validateInfos[formItem.field]"
          :label="formItem.label"
      >
        <!--      自定义复杂组件start-->
        <component v-if="formItem.type == 'component'" v-model:[formItem.field]="modelRef[formItem.field]" v-model:value="modelRef[formItem.field]" :is="formItem.component" v-on="formItem.eventObject"/>
        <!--      自定义复杂组件end-->

        <a-tooltip placement="top">
          <!--        是否需要输入提示start-->
          <template v-if="isString(formItem.tips)" v-slot:title>
            <span>{{ formItem.tips }}</span>
          </template>
          <!--        是否需要输入提示end-->

          <!--        普通输入框 start-->
          <a-input v-if="formItem.type == 'input'" v-model:value="modelRef[formItem.field]" v-bind="formItem.props" v-on="formItem.eventObject" autocomplete="new-password"
                   :disabled="formItem?.props?.disabled"/>
          <!--        普通输入框 end-->

          <!--        数字输入框 start-->
          <a-input-number v-if="formItem.type == 'inputNumber'" v-model:value="modelRef[formItem.field]" v-on="formItem.eventObject"
                          v-bind="formItem.props"/>
          <!--        数字输入框 end-->
        </a-tooltip>

        <!--        文本域 start-->
        <a-textarea v-if="formItem.type == 'textarea'" v-model:value="modelRef[formItem.field]" v-on="formItem.eventObject" v-bind="formItem.props"
                    :disabled="formItem?.props?.disabled"/>
        <!--        文本域end-->

        <!--      开关选择器start-->
        <a-switch v-if="formItem.type == 'switch'" v-model:checked="modelRef[formItem.field]" v-on="formItem.eventObject" v-bind="formItem.props"/>
        <!--      开关选择器end-->

        <!--        下拉选择器 start-->
        <template v-if="formItem.type == 'select'">
          <a-select v-model:value="modelRef[formItem.field]" v-on="formItem.eventObject" v-bind="formItem.props">
            <Option v-for="option in formItem.options" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </a-select>
        </template>
        <!--        下拉选择器 end-->

        <!--        单选框 start-->
        <template v-if="formItem.type == 'radio'">
          <a-radio-group v-model:value="modelRef[formItem.field]" v-on="formItem.eventObject">
            <a-radio v-for="option in formItem.options" :value="option.value" :key="option.value">
              {{ option.label }}
            </a-radio>
          </a-radio-group>
        </template>
        <!--        单选框 end-->

        <!--       复选框组start-->
        <template v-if="formItem.type == 'checkbox'">
          <a-checkbox-group v-model:value="modelRef[formItem.field]" v-on="formItem.eventObject" style="width: 100%">
            <a-row>
              <a-col v-for="option in formItem.options" :key="option.value" :span="8">
                <a-checkbox :value="option.value">
                  {{ option.label }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </template>
        <!--       复选框组end-->

        <!--      数值范围 start-->
        <template v-if="formItem.type == 'inputRange'">
          <a-input-group @change="sss" compact>
            <a-input
                v-model:value="modelRef[formItem.field.start]"
                style=" text-align: center"
                :placeholder="formItem.placeholder?.start || '起始值'"
            />
            <a-input
                style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                placeholder="~"
                disabled
            />
            <a-input
                v-model:value="modelRef[formItem.field.end]"
                style="text-align: center; border-left: 0"
                :placeholder="formItem.placeholder?.end || '结束值'"
            />
          </a-input-group>
        </template>
        <!--      数值范围 end-->

      </a-form-item>
    </template>
  </a-form>
</template>

<script lang="ts">
import {defineComponent, reactive, getCurrentInstance,nextTick, watch} from 'vue'
import components from "@/components/dynamic-form/components";
import {useForm} from "@ant-design-vue/use";
import {isString, isFunction} from '@/utils/is'

export default defineComponent({
  name: "dynamic-form",
  components,
  props: {
    dynamicValidateForm: { // 动态验证表单
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
    const modelRef = reactive(props.dynamicValidateForm.formItem.reduce((previousValue, currentValue) => {
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
    props.dynamicValidateForm.formItem.forEach(async item => {
      // 异步选项
      if (isFunction(item.asyncOptions)) {
        item.options = await item.asyncOptions(item, formInstance)
      } else if (isFunction(item.asyncValue)) { // 异步默认值
        modelRef[item.field] = await item.asyncValue(item, formInstance)
      }
    })

    // 表单验证规则
    const rulesRef = reactive(props.dynamicValidateForm.formItem.reduce((previousValue, currentValue) => {
      currentValue.rules && (previousValue[currentValue.field] = currentValue.rules)
      return previousValue
    }, {}))

    console.log(modelRef, '表单')

    console.log(rulesRef, '表单验证规则')

    const watchCallback = props.dynamicValidateForm.watchCallback ?? (() => ({}))

    // 是否有需要监测的字段
    props.dynamicValidateForm.watchKeys && watch(props.dynamicValidateForm.watchKeys.map(item => () => modelRef[item]), (curr, prev) => watchCallback(curr, {
      dynamicForm: props.dynamicValidateForm,
      modelRef
    }))
    // watch(props.dynamicValidateForm.watchKeys.map(item => () => modelRef[item]), eval(props.dynamicValidateForm.watchCallback))

    const {resetFields, validate, validateInfos} = useForm(modelRef, rulesRef);

    const sss = () => {
      console.log('ddd')
    }

    return {
      formItemLayout,
      validate,
      isString,
      sss,
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
