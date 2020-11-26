<template>
  <a-modal
      title="编辑账号"
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
import {editSchema} from "./edit-schema"
import {useAsync} from "@/hooks";
import {SchemaForm} from '@/components/JSON-schema-form'
import {patchAdminAccount} from "@/api/system/account";

export default defineComponent({
  name: "edit-modal",
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
      dynamicValidateForm: editSchema
    })

    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            const {username, roles} = dynamicForm.value.modelRef

            const params = {
              username,
              roles: roles.toString()
            }
            const result = await useAsync(patchAdminAccount(props.fields?.id, params), {ref: state, loadingName: 'confirmLoading'})
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
