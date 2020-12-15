<template>
  <dynamic-table ref="tableRef" :columns="columns" :get-list-func="getAdminRole" rowKey="id" :row-selection="rowSelection">
    <template v-slot:title>
      <a-button v-permission="{ action: 'create', effect: 'disabled' }" @click="addItem" type="primary">
        添加
      </a-button>
      <a-button @click="deleteItems" v-permission="{ action: 'delete' }" :disabled="isDisabled" type="primary">
        删除
      </a-button>
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, createVNode, computed, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {QuestionCircleOutlined} from '@ant-design/icons-vue'
import {DynamicTable} from '@/components/dynamic-table'
import {delAdminRole, getAdminRole, postAdminRole} from '@/api/system/role'
import {columns} from "./columns";
import {hasPermission} from "@/utils/permission/hasPermission";
import {useFormModal} from "@/hooks/useFormModal";
import {getFormSchema} from "./form-schema";

export default defineComponent({
  name: 'system-role',
  components: {
    DynamicTable
  },
  setup() {
    const tableRef = ref<any>(null)

    const state = reactive({
      tableLoading: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys;
        },
        selectedRowKeys: []
      },
    })

    // 删除多项
    const deleteItems = () => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await delAdminRole(state.rowSelection.selectedRowKeys.toString())
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加角色
    const addItem = () => {
      useFormModal({
        title: '添加角色',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          const {description, title, accessIdsList} = modelRef

          const params = {
            description, title,
            accessIdsList: accessIdsList.toString()
          }
          await postAdminRole(params)
          tableRef.value.refreshTableData()
        }
      })
      // useCreateModal(OperateModal, {
      //   callback: () => tableRef.value.refreshTableData()
      // })
    }
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    return {
      ...toRefs(state),
      columns,
      tableRef,
      getAdminRole,
      isDisabled,
      addItem,
      deleteItems,
    }
  }
})
</script>
