<template>
  <div>
    <QueryForm v-if="search" :columns="columns" :formProps="formProps" @query="queryTable" />
    <div class="bg-white">
      <ToolBar v-if="showToolBar" :title="headerTitle">
        <template #headerTitle v-if="$slots.headerTitle">
          <slot name="headerTitle"></slot>
        </template>
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
            v-for="slotItem in columns.filter((item) => item[slotName])"
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

<script lang="ts">
  import {
    defineComponent,
    reactive,
    PropType,
    ref,
    toRefs,
    watch,
    getCurrentInstance,
    computed,
    unref,
  } from 'vue';
  import { Table, Space } from 'ant-design-vue';
  import { tableProps } from 'ant-design-vue/lib/table';
  import type { TableProps, FormProps } from 'ant-design-vue';
  import { usePagination } from './hooks/usePagination';
  import type { LoadDataParams, TableColumn, OnChangeCallbackParams } from './typing';
  import { isObject } from '@/utils/is';
  import { createTableContext } from './hooks/useTableContext';
  import { omit } from 'lodash';
  import { TableAction, QueryForm, ToolBar } from './components';

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
    props: {
      ...tableProps(),
      /** 表单属性配置 */
      formProps: {
        type: Object as PropType<FormProps>,
        default: () => ({}),
      },
      columns: {
        type: Object as PropType<TableColumn[]>,
        required: true,
      },
      dataRequest: {
        // 获取列表数据函数API
        type: Function as PropType<
          (
            params?: LoadDataParams,
            onChangeParams?: OnChangeCallbackParams,
          ) => Promise<API.TableListResult>
        >,
      },
      /** 是否显示表格工具栏 */
      showToolBar: {
        type: Boolean,
        default: true,
      },
      /** 表格标题 */
      headerTitle: String,
      /** 是否显示搜索表单 */
      search: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['change', 'update:pageOption'],
    setup(props, { emit, slots }) {
      createTableContext(getCurrentInstance()!);

      const tableRef = ref<InstanceType<typeof Table>>();

      const innerPropsRef = ref<Partial<TableProps>>();

      console.log('slots', slots);

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) };
      });

      const { paginationRef } = usePagination(props.pagination);

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
      ];

      const state = reactive({
        expandItemRefs: {},
        tableData: [] as any[], // 表格数据
        loading: false, // 表格加载
      });

      // 如果外界设置了dataSource，那就直接用外界提供的数据
      watch(
        () => props.dataSource,
        (val) => {
          if (val) {
            state.tableData = val;
          }
        },
        {
          deep: true,
          immediate: true,
        },
      );

      const setProps = (props: Partial<TableProps>) => {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      };

      /**
       * @description 表格查询
       */
      const queryTable = (params) => {
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
          const _pagination = unref(paginationRef);
          const queryParams = {
            ...params,
          };
          if (isObject(_pagination)) {
            Object.assign(queryParams, {
              page: _pagination.current,
              limit: _pagination.pageSize,
            });
          }
          state.loading = true;
          const data = await props
            ?.dataRequest?.(queryParams)
            .finally(() => (state.loading = false));

          if (data?.pagination) {
            Object.assign(unref(paginationRef), {
              current: ~~data?.pagination.page,
              pageSize: ~~data?.pagination.size,
              total: ~~data?.pagination.total,
            });
          }

          state.tableData = data?.list || [];
        }

        // const end = Math.max(pageSize, current * pageSize)
        // .slice(end - pageSize, end) // 这里0，10是条数

        // 是否开启了合计行
        // if (props.showSummary) {
        //   const { pageSize, current } = unref(pagination);
        //   const end = Math.max(pageSize, current * pageSize);

        //   const data = Object.is(props.dataSource, undefined)
        //     ? state.tableData
        //     : state.tableData.slice(end - pageSize, end);
        // }
        // 是否可以拖拽行
        // props.dragRowEnable && (state.customRow = useDragRow<any>(state.tableData)!)
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
        let propsData: Recordable = {
          ...props,
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

      // 操作事件
      // const actionEvent = async (record, func, actionType = '') => {
      //   try {
      //     // 将reloadTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
      //     await func({ record, props }, () => setTimeout(reloadTableData));
      //     // 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
      //     if (actionType == 'del' && state.tableData.length < 2) {
      //       unref(paginationRef).current = Math.max(1, unref(paginationRef).current - 1);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };

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

      // dataIndex 可以为 a.b.c
      // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

      // 获取表格列key
      const getColumnKey = (column: TableColumn) => {
        return column.key || column.dataIndex;
      };

      return {
        ...toRefs(state),
        tableRef,
        defaultSlots,
        getProps,
        getBindValues,
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

      .ant-btn {
        margin-right: 10px;
      }
    }
  }

  .actions > * {
    margin-right: 10px;
  }
</style>
