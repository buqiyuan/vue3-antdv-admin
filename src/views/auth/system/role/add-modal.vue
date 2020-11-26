<template>
  <a-modal
      title="新增角色"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <dynamic-form ref="dynamicForm" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, onMounted, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {addSchema} from "./add-schema";
import {useAsync} from "@/hooks";
import DynamicForm from '@/components/dynamic-form/dynamic-form.vue'
import {postAdminRole} from "@/api/system/role";

export default defineComponent({
  name: "add-modal",
  components: { [Modal.name]: Modal, DynamicForm},
  props: {
    remove: { // 移除模态框
      type: Function
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

    // 确定添加
    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            const param = {
              ...dynamicForm.value.modelRef,
              accessIdsList: dynamicForm.value.modelRef.accessIdsList.toString()
            }
            await useAsync(postAdminRole(param), {ref: state, loadingName: 'confirmLoading'})
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
