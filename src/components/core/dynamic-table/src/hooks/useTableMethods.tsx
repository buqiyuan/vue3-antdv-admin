import { unref } from 'vue';
import { isObject, isString } from 'lodash-es';
import type { VNode } from 'vue';
import type { DynamicTableProps, DynamicTableEmitFn } from '../dynamic-table';
import type { OnChangeCallbackParams, TableColumn } from '../../types/column';
import type { TableState } from './useTableState';

export type TableMethods = ReturnType<typeof useTableMethods>;

export type UseTableMethodsContext = {
  state: TableState;
  props: DynamicTableProps;
  emit: DynamicTableEmitFn;
};

export const useTableMethods = ({ state, props, emit }: UseTableMethodsContext) => {
  const { innerPropsRef, tableData, loadingRef, queryFormRef, paginationRef } = state;

  const setProps = (props: Partial<DynamicTableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  };

  const getComponent = (comp: VNode | string) => {
    return isString(comp) ? <>{comp}</> : comp;
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
      loadingRef.value = true;
      const data = await props
        ?.dataRequest?.(queryParams)
        .finally(() => (loadingRef.value = false));

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
        tableData.value = data!.list;
      } else if (Array.isArray(data)) {
        tableData.value = data;
      } else {
        tableData.value = [];
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
    return column?.key || column?.dataIndex;
  };

  /**
   * @description当外部需要动态改变搜索表单的值或选项时，需要调用此方法获取dynamicFormRef实例
   */
  const getQueryFormRef = () => queryFormRef.value;

  return {
    setProps,
    getComponent,
    queryTable,
    handleTableChange,
    getColumnKey,
    fetchTableData,
    getQueryFormRef,
    refreshTable,
  };
};
