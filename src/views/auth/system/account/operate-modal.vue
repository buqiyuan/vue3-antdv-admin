<template>
  <a-modal
      :title="fields ? '编辑账号' : '添加账号'"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <schema-form ref="dynamicForm" :fields="{...fields,roles:fields?.roles.map(item => item.id)}" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted} from 'vue'
import {Modal} from 'ant-design-vue'
import {formSchema} from "./form-schema"
import {useAsync} from "@/hooks";
import {SchemaForm} from '@/components/JSON-schema-form'
import {patchAdminAccount, postAdminAccount} from "@/api/system/account";

export default defineComponent({
  name: "operate-modal",
  components: { [Modal.name]: Modal, SchemaForm},
  props: {
    remove: { // 移除模态框
      type: Function
    },
    fields: {
      type: Object
    },
    callback: {
      type: Function
    }
  },
  setup(props) {
    const dynamicForm = ref<any>(null)

    const state = reactive({
      visible: true,
      confirmLoading: false,
      dynamicValidateForm: formSchema
    })

    // 如果是编辑操作，则隐藏password字段
    state.dynamicValidateForm.formItem.find(item => item.field == 'password')!.hidden = !!props.fields

    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            const {username, password, roles} = dynamicForm.value.modelRef

            const params = {
              username,
              password,
              roles: roles.toString()
            }
            const id = props.fields?.id
            // 有id为编辑，无则添加
            if (id) {
              await patchAdminAccount(id, params).finally(() => state.confirmLoading = false)
            } else {
              await postAdminAccount(params).finally(() => state.confirmLoading = false)
            }
            state.visible = false;
            props.callback && props.callback()
          })
          .catch(err => {
            console.log('error', err);
            state.confirmLoading = false
          });
    }

    return {
      ...toRefs(state),
      handleOk,
      dynamicForm,
    }
  }
})
</script>

<style scoped>
</style>
