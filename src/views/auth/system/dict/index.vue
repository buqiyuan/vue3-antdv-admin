<template>
  <dynamic-table ref="tableRef" :columns="columns" :get-list-func="getAdminDictConfig" rowKey="id"
                 :row-selection="rowSelection">
    <template v-slot:title>
      <a-button @click="addItem" type="primary">
        新增字典
      </a-button>
      <a-button @click="deleteItems" :disabled="isDisabled" type="primary">
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
import {delAdminDictConfig, getAdminDictConfig, patchAdminDictConfig, postAdminDictConfig} from '@/api/system/dict'
import {getFormSchema} from "./form-schema"
import {columns} from "./columns";
import {hasPermission} from "@/utils/permission/hasPermission";
import {useFormModal} from "@/hooks/useFormModal/";

export default defineComponent({
  name: 'system-dict',
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
          await delAdminDictConfig(state.rowSelection.selectedRowKeys.toString())
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加字典
    const addItem = () => {
      useFormModal({
        title: '添加字典',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          await postAdminDictConfig(modelRef)
          tableRef.value.refreshTableData()
        }
      })
    }
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    return {
      ...toRefs(state),
      columns,
      tableRef,
      getAdminDictConfig,
      isDisabled,
      addItem,
      deleteItems,
    }
  }
})
</script>
