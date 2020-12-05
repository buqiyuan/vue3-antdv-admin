<template>
  <a-modal
      :title="fields ? '编辑字典' : '新增字典'"
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
import {addSchema} from "./form-schema"
import {useAsync} from "@/hooks";
import {SchemaForm} from '@/components/JSON-schema-form'
import {patchAdminDictConfig, postAdminDictConfig} from "@/api/system/dict";

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
      dynamicValidateForm: addSchema
    })

    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            // 传了id为编辑操作，否则添加
            if (props.fields?.id) {
              await patchAdminDictConfig(props.fields?.id, dynamicForm.value.modelRef).finally(() => state.confirmLoading = false)
            } else {
              await postAdminDictConfig(dynamicForm.value.modelRef).finally(() => state.confirmLoading = false)
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
