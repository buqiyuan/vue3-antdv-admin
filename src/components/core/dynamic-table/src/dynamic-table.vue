<template>
  <div>
    <Teleport to="body" :disabled="!isFullscreen">
      <div ref="containerElRef">
        <SchemaForm
          v-if="innerPropsRef.search"
          ref="searchFormRef"
          class="bg-white dark:bg-black mb-16px !pt-24px pr-24px"
          submit-on-reset
          v-bind="getFormProps"
          :table-instance="dynamicTableContext"
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
            <template v-for="name of Object.keys($slots)" #[name]="data" :key="name">
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
  import { computed, onBeforeMount } from 'vue';
  import { Table } from 'ant-design-vue';
  import {
    useTableMethods,
    createTableContext,
    useExportData2Excel,
    useTableForm,
    useTableState,
    useColumns,
  } from './hooks';
  import { ToolBar } from './components';
  import { dynamicTableProps, dynamicTableEmits } from './dynamic-table';
  import { SchemaForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DynamicTable',
    inheritAttrs: false,
  });

  const props = defineProps(dynamicTableProps);
  const emit = defineEmits(dynamicTableEmits);

  // 表格内部状态
  const tableState = useTableState(props);
  const {
    tableRef,
    tableData,
    isFullscreen,
    containerElRef,
    searchFormRef,
    editTableFormRef,
    innerPropsRef,
    getBindValues,
    editFormModel,
  } = tableState;

  // 表格内部方法
  const tableMethods = useTableMethods({ props, emit, tableState });
  const { fetchData, handleSubmit, handleTableChange, handleEditFormValidate } = tableMethods;

  // 表格列的配置描述
  const { innerColumns } = useColumns({ props, tableState, tableMethods });

  // 搜索表单
  const tableForm = useTableForm({ tableState, tableMethods });
  const { getFormProps, replaceFormSlotKey, getFormSlotKeys } = tableForm;

  // 表单导出
  const exportData2ExcelHooks = useExportData2Excel({ props, tableState, tableMethods });

  // 当前组件所有的状态和方法
  const dynamicTableContext = {
    tableProps: props,
    emit,
    innerColumns,
    ...tableState,
    ...tableForm,
    ...tableMethods,
    ...exportData2ExcelHooks,
  };

  // 创建表格上下文
  createTableContext(dynamicTableContext);

  defineExpose(dynamicTableContext);

  const tableProps = computed<Recordable>(() => {
    const { getExpandOption } = tableMethods;
    return {
      ...getBindValues.value,
      ...getExpandOption.value,
    };
  });

  onBeforeMount(() => {
    if (props.immediate) {
      fetchData();
    }
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
