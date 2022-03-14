<template>
  <div class="p-5">
    <SchemaForm
      v-if="search"
      ref="queryFormRef"
      class="bg-white mb-16px pt-24px pr-24px"
      submit-on-reset
      v-bind="getFormProps"
      @toggle-advanced="(e) => $emit('toggle-advanced', e)"
      @submit="queryTable"
    >
      <template v-for="item in getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </SchemaForm>
    <div class="bg-white">
      <ToolBar
        v-if="showToolBar"
        :title="headerTitle"
        :title-tooltip="titleTooltip"
        :show-table-setting="showTableSetting"
      >
        <template v-if="$slots.headerTitle" #headerTitle>
          <slot name="headerTitle"></slot>
        </template>
        <span v-if="exportFileName" class="ml-6px" @click="exportData2Excel">
          <slot name="export-button">
            <a-button type="primary">导出</a-button>
          </slot>
        </span>
        <template v-if="$slots.toolbar" #toolbar>
          <Space><slot name="toolbar"></slot></Space>
        </template>
      </ToolBar>
      <Table
        ref="tableRef"
        v-bind="getBindValues"
        :data-source="tableData"
        @change="handleTableChange"
      >
        <template
          v-for="slotName in defaultSlots.filter((name) => Reflect.has($slots, name))"
          #[slotName]="slotData"
          :key="slotName"
        >
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>

        <!-- 个性化单元格 start -->
        <template
          v-for="slotName in ['bodyCell', 'headerCell']"
          #[slotName]="slotData"
          :key="slotName"
        >
          <slot :name="slotName" v-bind="slotData"></slot>
          <!-- 表格行操作start -->
          <template v-if="slotName === 'bodyCell' && getColumnKey(slotData.column) === '$action'">
            <TableAction :actions="slotData.column.actions(slotData)" />
          </template>
          <!-- 表格行操作end -->
          <template
            v-for="slotItem in getBindValues.columns?.filter((item) => item[slotName])"
            :key="getColumnKey(slotItem)"
          >
            <component
              :is="getComponent(slotItem?.[slotName]?.(slotData))"
              v-if="getColumnKey(slotData.column) === getColumnKey(slotItem)"
            />
          </template>
        </template>
        <!-- 个性化单元格 end -->
      </Table>
    </div>
  </div>
</template>

<script lang="tsx" setup>
  import { useSlots } from 'vue';
  import { Table, Space } from 'ant-design-vue';
  import {
    useTableMethods,
    createTableContext,
    useExportData2Excel,
    useTableForm,
    useTableState,
  } from './hooks';
  import { TableAction, ToolBar } from './components';
  import { dynamicTableProps, defaultSlots, dynamicTableEmits } from './dynamic-table';
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
  const { tableData, getProps, queryFormRef, loadingRef, getBindValues } = tableState;
  // 表格内部方法
  const tableMethods = useTableMethods({ state: tableState, props, emit });
  const { getColumnKey, fetchTableData, queryTable, handleTableChange, getComponent } =
    tableMethods;

  // 搜索表单
  const { getFormProps, replaceFormSlotKey, getFormSlotKeys } = useTableForm(
    getProps,
    slots,
    getColumnKey,
    loadingRef,
  );

  // 当前组件所有的状态和方法
  const instance = {
    ...props,
    ...tableState,
    ...tableMethods,
  };

  // 表单导出
  const { exportData2Excel } = useExportData2Excel(instance);

  createTableContext(instance);

  fetchTableData();

  defineExpose(instance);
</script>

<style lang="less" scoped>
  :deep(.ant-table-wrapper) {
    padding: 0 6px 6px 6px;
    .ant-table {
      .ant-table-title {
        display: flex;
      }

      .ant-image:hover {
        cursor: zoom-in;
      }

      .ant-btn {
        margin-right: 10px;
      }
    }
  }

  .actions > * {
    margin-right: 10px;
  }
</style>
