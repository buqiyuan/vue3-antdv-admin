<template>
  <dynamic-table ref="tableRef" @expand="expand" :columns="columns" :get-list-func="getAdminAccess" rowKey="id"
                 :row-selection="rowSelection">
    <template v-slot:title>
      <a-button @click="addItem" type="primary">
        添加
      </a-button>
      <a-button @click="deleteItems" :disabled="isDisabled" type="primary">
        删除
      </a-button>
    </template>
    <template v-slot:moduleName="{record}">
      {{ record.moduleName || record.actionName }}
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, createVNode, computed, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {QuestionCircleOutlined} from '@ant-design/icons-vue'
import {DynamicTable} from '@/components/dynamic-table'
import {useCreateModal} from "@/hooks";
import {delAdminAccess, getAdminAccess} from '@/api/system/access'
import AddModal from './add-modal.vue'
import {columns} from "./columns";
import {hasPermission} from "@/utils/hasPermission";

export default defineComponent({
  name: 'system-access',
  components: {
    DynamicTable
  },
  setup() {
    const tableRef = ref<any>(null)

    const state = reactive({
      data: [],
      uploading: false,
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
          await delAdminAccess(state.rowSelection.selectedRowKeys.toString())
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加策略
    const addItem = () => {
      useCreateModal(AddModal, {
        callback: () => {
          tableRef.value.refreshTableData()
        }
      })
    }
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    const expand = async (expanded, record) => {
      console.log(expanded, record)
      if (expanded && record.children && !Array.isArray(record.children)) {
        const {data} = await getAdminAccess({id: record.id,limit: 100})
        record.children = data
      }
    }

    return {
      ...toRefs(state),
      columns,
      tableRef,
      expand,
      getAdminAccess,
      isDisabled,
      addItem,
      deleteItems,
    }
  }
})
</script>
