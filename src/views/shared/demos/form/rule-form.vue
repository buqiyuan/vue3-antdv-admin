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
import {FormSchema} from "@/types/schema";

/**
 * @description 验证表单
 */
export default defineComponent({
  name: "rule-form",
  components: { [Alert.name]: Alert, [Card.name]: Card, AButton, SchemaForm},
  setup() {
    const dynamicForm = ref<any>(null)
    // 验证表单
    const formSchema: FormSchema = {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      formItem: [
        {
          type: "input",
          label: "密码",
          field: "password",
          value: '',
          props: {
            'has-feedback': true,
            placeholder: "请输入密码"
          },
          rules: [
            {
              required: true,
              message: "密码不能为空",
              validator: async (rule, value) => {
                // 获取二次确认密码
                const confirmPassword = dynamicForm.value.modelRef.confirmPassword
                if (value === '') {
                  return Promise.reject('请输入密码');
                } else {
                  if (confirmPassword !== '') {
                    dynamicForm.value.validateField('confirmPassword');
                  }
                  return Promise.resolve();
                }
              }
            }
          ]
        },
        {
          type: "input",
          label: "确认密码",
          field: "confirmPassword",
          value: "",
          props: {
            'has-feedback': true,
            placeholder: "请输入分类"
          },
          rules: [
            {
              "required": true,
              "message": "请输入确认密码",
              validator: async (rule, value, callback, source, options) => {
                console.log(source, 'Yuan ')
                // 获取第一个密码
                const password = dynamicForm.value.modelRef.password
                if (value === '') {
                  return Promise.reject('请重新输入密码');
                } else if (value !== password) {
                  return Promise.reject("两次输入的密码不匹配!");
                } else {
                  return Promise.resolve();
                }
              }
            }
          ]
        },
      ]
    }
    // 点击提交
    const confirm = () => dynamicForm.value.validate()

    return {
      dynamicForm,
      confirm,
      formSchema
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
