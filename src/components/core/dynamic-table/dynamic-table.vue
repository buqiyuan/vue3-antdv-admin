<template>
  <div>
    <QueryForm
      v-if="search"
      ref="queryFormRef"
      :columns="columns"
      :formProps="formProps"
      @toggle-advanced="(e) => $emit('toggle-advanced', e)"
      @query="queryTable"
    />
    <div class="bg-white">
      <ToolBar
        v-if="showToolBar"
        :title="headerTitle"
        :titleTooltip="titleTooltip"
        :showTableSetting="showTableSetting"
      >
        <template #headerTitle v-if="$slots.headerTitle">
          <slot name="headerTitle"></slot>
        </template>
        <span v-if="exportFileName" class="ml-6px" @click="exportData2Excel">
          <slot name="export-button">
            <a-button type="primary">导出</a-button>
          </slot>
        </span>
        <template #toolbar v-if="$slots.toolbar">
          <Space><slot name="toolbar"></slot></Space>
        </template>
      </ToolBar>
      <Table
        ref="tableRef"
        v-bind="getBindValues"
        :dataSource="tableData"
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
              :is="slotItem?.[slotName]?.(slotData)"
              v-if="getColumnKey(slotData.column) === getColumnKey(slotItem)"
            />
          </template>
        </template>
        <!-- 个性化单元格 end -->
      </Table>
    </div>
  </div>
</template>

<script lang="tsx">
  import {
    defineComponent,
    reactive,
    ref,
    toRefs,
    watchEffect,
    getCurrentInstance,
    computed,
    unref,
  } from 'vue';
  import { Table, Space } from 'ant-design-vue';
  import { usePagination, createTableContext, useExportData2Excel } from './hooks/';
  import type { TableColumn, OnChangeCallbackParams } from './typing';
  import { isBoolean, isObject } from '@/utils/is';
  import { omit } from 'lodash-es';
  import { TableAction, QueryForm, ToolBar } from './components';
  import dynamicTableProps, { TableProps } from './props';
  import { type SchemaFormRef } from '@/components/core/schema-form';

  export default defineComponent({
    name: 'DynamicTable',
    components: {
      Table,
      Space,
      TableAction,
      QueryForm,
      ToolBar,
    },
    inheritAttrs: false,
    props: dynamicTableProps,
    emits: ['change', 'toggle-advanced'],
    setup(props, { emit, slots }) {
      createTableContext(getCurrentInstance()!);

      const { exportData2Excel } = useExportData2Excel(getCurrentInstance()!);

      const { paginationRef } = usePagination(props.pagination);

      const tableRef = ref<InstanceType<typeof Table>>();
      const queryFormRef = ref<InstanceType<typeof QueryForm>>();

      const innerPropsRef = ref<Partial<TableProps>>();

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) };
      });

      // 默认支持的插槽
      const defaultSlots = [
        'emptyText',
        'expandIcon',
        'title',
        'footer',
        'summary',
        'expandedRowRender',
        'customFilterIcon',
        'customFilterDropdown',
      ] as const;

      const state = reactive({
        expandItemRefs: {},
        tableData: [] as any[], // 表格数据
        loading: false, // 表格加载
      });

      // 如果外界设置了dataSource，那就直接用外界提供的数据
      watchEffect(() => {
        if (props.dataSource) {
          state.tableData = props.dataSource;
        }
      });

      const setProps = (props: Partial<TableProps>) => {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      };

      /**
       * @description 表格查询
       */
      const queryTable = (params) => {
        params.page = 1;
        fetchTableData(params);
      };

      /**
       * @param {object} params 表格查询参数
       * @param {boolean} flush 是否将页数重置到第一页
       * @description 获取表格数据
       */
      const fetchTableData = async (params = {}) => {
        // 如果用户没有提供dataSource并且dataRequest是一个函数，那就进行接口请求
        if (
          Object.is(props.dataSource, undefined) &&
          Object.prototype.toString.call(props.dataRequest).includes('Function')
        ) {
          const _pagination = unref(paginationRef)!;
          // 是否启用了分页
          const enablePagination = isObject(_pagination);
          const queryParams = {
            ...params,
          };
          if (enablePagination) {
            Object.assign(queryParams, {
              page: _pagination.current,
              limit: _pagination.pageSize,
              ...queryParams,
            });
          }
          state.loading = true;
          const data = await props
            ?.dataRequest?.(queryParams)
            .finally(() => (state.loading = false));

          if (data?.pagination) {
            const { page, size, total } = data.pagination;

            if (enablePagination && _pagination?.current) {
              // 有分页时,删除当前页最后一条数据时 往前一页查询
              if (data?.list.length === 0 && total > 0 && page > 1) {
                _pagination.current--;
                return refreshTable();
              }
            }

            Object.assign(unref(paginationRef), {
              current: ~~page,
              pageSize: ~~size,
              total: ~~total,
            });
          }
          if (Array.isArray(data?.list)) {
            state.tableData = data!.list;
          } else if (Array.isArray(data)) {
            state.tableData = data;
          } else {
            state.tableData = [];
          }
        }
      };

      /**
       * @description 刷新表格
       */
      const refreshTable = (flush = false) => {
        const pagination = unref(paginationRef);
        if (Object.is(flush, true) && isObject(pagination)) {
          pagination.current = 1;
        }
        fetchTableData();
      };

      fetchTableData();

      const getBindValues = computed(() => {
        const props = unref(getProps);
        const columns = (props.columns as TableColumn[]).filter((n) => !n.hideInTable);
        // 是否添加序号列
        if (props.showIndex) {
          columns.unshift({
            dataIndex: '$$index',
            title: '序号',
            width: 60,
            align: 'center',
            fixed: 'left',
            ...props.indexColumnProps,
            bodyCell: ({ index }) => {
              const getPagination = unref(paginationRef);
              if (isBoolean(getPagination)) {
                return <>{`${index + 1}`}</>;
              }
              const { current = 1, pageSize = 10 } = getPagination!;
              return <>{((current < 1 ? 1 : current) - 1) * pageSize + index + 1}</>;
            },
          });
        }
        let propsData: Recordable = {
          ...props,
          columns,
          rowKey: props.rowKey ?? 'id',
          loading: state.loading,
          tableLayout: 'fixed',
          pagination: unref(paginationRef),
        };
        if (slots.expandedRowRender) {
          propsData = omit(propsData, 'scroll');
        }

        propsData = omit(propsData, ['class', 'onChange']);
        return propsData;
      });

      /**
       * @description 分页改变
       */
      const handleTableChange: OnChangeCallbackParams = (...rest) => {
        // const [pagination, filters, sorter] = rest;
        const [pagination] = rest;
        if (Object.keys(pagination).length) {
          Object.assign(unref(paginationRef), pagination);
        }
        fetchTableData();
        emit('change', ...rest);
      };

      /**
       * 当外部需要动态改变搜索表单的值或选项时，需要调用此方法获取dynamicFormRef实例
       */
      const getQueryFormRef = () => {
        return queryFormRef.value?.dynamicFormRef as SchemaFormRef;
      };

      // dataIndex 可以为 a.b.c
      // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

      // 获取表格列key
      const getColumnKey = (column: TableColumn) => {
        return column?.key || column?.dataIndex;
      };

      return {
        ...toRefs(state),
        tableRef,
        queryFormRef,
        defaultSlots,
        getProps,
        getBindValues,
        getQueryFormRef,
        exportData2Excel,
        queryTable,
        setProps,
        getColumnKey,
        handleTableChange,
        refreshTable,
      };
    },
  });
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
