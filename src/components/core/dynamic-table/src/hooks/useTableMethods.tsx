import { unref } from 'vue';
import { isObject, isString } from 'lodash-es';
import { useEditable } from './useEditable';
import type { VNode } from 'vue';
import type { DynamicTableProps, DynamicTableEmitFn } from '../dynamic-table';
import type { OnChangeCallbackParams, TableColumn } from '../types/';
import type { TableState } from './useTableState';

export type TableMethods = ReturnType<typeof useTableMethods>;

export type UseTableMethodsContext = {
  state: TableState;
  props: DynamicTableProps;
  emit: DynamicTableEmitFn;
};

export const useTableMethods = ({ state, props, emit }: UseTableMethodsContext) => {
  const { innerPropsRef, tableData, loadingRef, queryFormRef, paginationRef, editFormErrorMsgs } =
    state;
  // 可编辑行
  const editableMethods = useEditable({ state, props });

  const setProps = (props: Partial<DynamicTableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  };

  const getComponent = (comp: VNode | string) => {
    return isString(comp) ? <>{comp}</> : comp;
  };

  /**
   * @description 表格查询
   */
  const handleSubmit = (params, page = 1) => {
    params.page = page;
    fetchData(params);
  };

  /**
   * @param {object} params 表格查询参数
   * @param {boolean} flush 是否将页数重置到第一页
   * @description 获取表格数据
   */
  const fetchData = async (params = {}, rest?: OnChangeCallbackParams) => {
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
        ?.dataRequest?.(queryParams, rest)
        .finally(() => (loadingRef.value = false));

      if (data?.pagination) {
        const { page, size, total } = data.pagination;

        if (enablePagination && _pagination?.current) {
          // 有分页时,删除当前页最后一条数据时 往前一页查询
          if (data?.list.length === 0 && total > 0 && page > 1) {
            _pagination.current--;
            return reload();
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
    return tableData;
  };

  /**
   * @description 刷新表格
   */
  const reload = async (resetPageIndex = false) => {
    const pagination = unref(paginationRef);
    if (Object.is(resetPageIndex, true) && isObject(pagination)) {
      pagination.current = 1;
    }
    return await fetchData();
  };

  /**
   * @description 分页改变
   */
  const handleTableChange = async (...rest: OnChangeCallbackParams) => {
    // const [pagination, filters, sorter] = rest;
    const [pagination] = rest;
    let params = {};
    if (queryFormRef.value) {
      const values = await queryFormRef.value.validate();
      params = queryFormRef.value.handleFormValues(values);
    }
    Object.assign(unref(paginationRef), pagination || {});
    fetchData(params, rest);
    emit('change', ...rest);
  };

  // dataIndex 可以为 a.b.c
  // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

  // 获取表格列key
  const getColumnKey = (column: TableColumn) => {
    return column?.key || column?.dataIndex;
  };

  /** 编辑表单验证失败回调 */
  const handleEditFormValidate = (name: string[], status, errorMsgs) => {
    // console.log('errorInfo', editFormErrorMsgs);
    if (status) {
      editFormErrorMsgs.value.delete(name.join('.'));
    } else {
      editFormErrorMsgs.value.set(name.join('.'), errorMsgs);
    }
  };

  /**
   * @description当外部需要动态改变搜索表单的值或选项时，需要调用此方法获取dynamicFormRef实例
   */
  const getQueryFormRef = () => queryFormRef.value;

  return {
    ...editableMethods,
    setProps,
    getComponent,
    handleSubmit,
    handleTableChange,
    getColumnKey,
    fetchData,
    getQueryFormRef,
    reload,
    handleEditFormValidate,
  };
};
