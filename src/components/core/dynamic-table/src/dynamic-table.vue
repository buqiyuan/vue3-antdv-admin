<template>
  <div>
    <Teleport to="body" :disabled="!isFullscreen">
      <div ref="containerElRef">
        <SchemaForm
          v-if="getProps.search"
          ref="queryFormRef"
          class="bg-white dark:bg-black mb-16px !pt-24px pr-24px"
          submit-on-reset
          v-bind="getFormProps"
          :schemas="formSchemas"
          :table-instance="tableAction"
          @toggle-advanced="(e) => $emit('toggle-advanced', e)"
          @submit="handleSubmit"
        >
          <template v-for="item of getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
            <slot :name="item" v-bind="data || {}" />
          </template>
        </SchemaForm>
        <div class="bg-white dark:bg-black">
          <ToolBar
            v-if="showToolBar"
            :export-file-name="exportFileName"
            :title="headerTitle"
            :title-tooltip="titleTooltip"
            :show-table-setting="showTableSetting"
          >
            <template v-for="name of Object.keys($slots)" #[name]="data">
              <slot :name="name" v-bind="data || {}" />
            </template>
          </ToolBar>
          <SchemaForm
            ref="editTableFormRef"
            no-style
            :initial-values="editFormModel"
            :show-action-button-group="false"
            :show-advanced-button="false"
            @validate="handleEditFormValidate"
          >
            <Table
              ref="tableRef"
              v-bind="tableProps"
              :columns="innerColumns"
              :data-source="tableData"
              @change="handleTableChange"
            >
              <template v-for="(_, slotName) of $slots" #[slotName]="slotData" :key="slotName">
                <slot :name="slotName" v-bind="slotData" />
              </template>
              <template #bodyCell="slotData">
                <slot name="bodyCell" v-bind="slotData" />
              </template>
            </Table>
          </SchemaForm>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="tsx" setup>
  import { useSlots, computed } from 'vue';
  import { Table } from 'ant-design-vue';
  import {
    useTableMethods,
    createTableContext,
    useExportData2Excel,
    useTableForm,
    useTableState,
    useColumns,
    useEditable,
  } from './hooks';
  import { ToolBar } from './components';
  import { dynamicTableProps, dynamicTableEmits } from './dynamic-table';
  import type { TableActionType } from './types';
  import { SchemaForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DynamicTable',
    inheritAttrs: false,
  });

  const props = defineProps(dynamicTableProps);
  const emit = defineEmits(dynamicTableEmits);
  const slots = useSlots();

  // 表格内部状态
  const tableState = useTableState({ props, slots });
  const {
    tableRef,
    tableData,
    isFullscreen,
    containerElRef,
    queryFormRef,
    editTableFormRef,
    getProps,
    getBindValues,
    editFormModel,
  } = tableState;
  // 表格内部方法
  const tableMethods = useTableMethods({ state: tableState, props, emit });
  const { setProps, fetchData, handleSubmit, reload, handleTableChange, handleEditFormValidate } =
    tableMethods;
  // 控制编辑行
  const editableHooks = useEditable({ props, state: tableState });

  const tableAction: TableActionType = {
    setProps,
    reload,
    fetchData,
    ...editableHooks,
  };

  // 表格列的配置描述
  const { innerColumns } = useColumns({
    props,
    slots,
    state: tableState,
    methods: tableMethods,
    tableAction,
  });

  // 搜索表单
  const tableForm = useTableForm({
    tableState,
    tableMethods,
    slots,
  });
  const { getFormProps, replaceFormSlotKey, getFormSlotKeys, formSchemas } = tableForm;

  // 表单导出
  const exportData2ExcelHooks = useExportData2Excel({
    props,
    state: tableState,
    methods: tableMethods,
  });

  // 当前组件所有的状态和方法
  const instance = {
    ...props,
    ...tableState,
    ...tableForm,
    ...tableMethods,
    ...editableHooks,
    ...exportData2ExcelHooks,
    emit,
  };

  createTableContext(instance);

  fetchData();

  defineExpose(instance);

  const tableProps = computed<Recordable>(() => {
    const { getExpandOption } = tableMethods;
    return {
      ...getBindValues.value,
      ...getExpandOption.value,
    };
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-wrapper) {
    padding: 0 6px 6px;

    .ant-table {
      .ant-table-title {
        display: flex;
      }

      .ant-image:hover {
        cursor: zoom-in;
      }
    }
  }

  .actions > * {
    margin-right: 10px;
  }
</style>
