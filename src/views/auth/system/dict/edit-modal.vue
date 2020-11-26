<template>
  <a-modal
      title="编辑字典"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <dynamic-form ref="dynamicForm" :fields="fields" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted} from 'vue'
import {Modal} from 'ant-design-vue'
import {addSchema} from "./add-schema"
import {useAsync} from "@/hooks";
import DynamicForm from '@/components/dynamic-form/dynamic-form.vue'
import {patchAdminDictConfig} from "@/api/system/dict";

export default defineComponent({
  name: "edit-modal",
  components: { [Modal.name]: Modal, DynamicForm},
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
            const result = await useAsync(patchAdminDictConfig(props.fields?.id, dynamicForm.value.modelRef), {ref: state, loadingName: 'confirmLoading'})
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
