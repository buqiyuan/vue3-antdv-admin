<template>
  <a-modal
      title="编辑角色"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <schema-form ref="dynamicForm" :fields="fields" :dynamic-validate-form="dynamicValidateForm"/>
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted} from 'vue'
import {Modal} from 'ant-design-vue'
import {formSchema} from "./form-schema"
import {useAsync} from "@/hooks";
import {SchemaForm} from '@/components/JSON-schema-form'
import {patchAdminRole, getAdminRoleAccess, postAdminRole} from "@/api/system/role";

export default defineComponent({
  name: "operate-modal",
  components: {[Modal.name]: Modal, SchemaForm},
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

    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then(async res => {
            const {description, title, accessIdsList} = dynamicForm.value.modelRef

            const params = {
              id: props.fields?.id,
              description, title,
              accessIdsList: accessIdsList.toString()
            }
            // 有id为编辑，无则添加
            if (params.id) {
              await patchAdminRole(props.fields?.id, params).finally(() => state.confirmLoading = false)
            } else {
              await postAdminRole(params).finally(() => state.confirmLoading = false)
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
