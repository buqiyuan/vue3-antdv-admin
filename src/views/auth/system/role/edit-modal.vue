<template>
  <a-modal
      title="编辑角色"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <schema-form ref="dynamicForm" :fields="fields" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted} from 'vue'
import {Modal} from 'ant-design-vue'
import {addSchema} from "./add-schema"
import {useAsync} from "@/hooks";
import {SchemaForm} from '@/components/JSON-schema-form'
import {patchAdminRole, getAdminRoleAccess} from "@/api/system/role";

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
      dynamicValidateForm: addSchema
    })

    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            const {description, title, accessIdsList} = dynamicForm.value.modelRef

            const params = {
              description, title,
              accessIdsList: accessIdsList.toString()
            }
            const result = await useAsync(patchAdminRole(props.fields?.id, params), {ref: state, loadingName: 'confirmLoading'})
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
