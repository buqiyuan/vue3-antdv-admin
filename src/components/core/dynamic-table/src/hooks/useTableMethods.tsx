import { unref, nextTick, getCurrentInstance } from 'vue';
import { isObject, isFunction, isBoolean, get } from 'lodash-es';
import { useInfiniteScroll } from '@vueuse/core';
import tableConfig from '../dynamic-table.config';
import { useEditable } from './useEditable';
import type { DynamicTableProps, DynamicTableEmitFn } from '../dynamic-table';
import type { OnChangeCallbackParams, TableColumn } from '../types/';
import type { Pagination, TableState } from './useTableState';
import type { FormProps } from 'ant-design-vue';
import { warn } from '@/utils/log';

export type UseInfiniteScrollParams = Parameters<typeof useInfiniteScroll>;

export type TableMethods = ReturnType<typeof useTableMethods>;

export type UseTableMethodsContext = {
  state: TableState;
  props: DynamicTableProps;
  emit: DynamicTableEmitFn;
};

export const useTableMethods = ({ state, props, emit }: UseTableMethodsContext) => {
  const {
    innerPropsRef,
    tableData,
    loadingRef,
    queryFormRef,
    paginationRef,
    editFormErrorMsgs,
    searchState,
  } = state;
  // 可编辑行
  const editableMethods = useEditable({ state, props });

  const setProps = (props: Partial<DynamicTableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  };

  /**
   * @description 表格查询
   */
  const handleSubmit = (params, page = 1) => {
    updatePagination({
      current: page,
    });
    fetchData(params);
  };

  /**
   * @param {object} params 表格查询参数
   * @param {boolean} flush 是否将页数重置到第一页
   * @description 获取表格数据
   */
  const fetchData = async (params = {}, rest?: OnChangeCallbackParams) => {
    console.log('rest', rest);
    const { dataRequest, dataSource, fetchConfig } = props;

    if (!dataRequest || !isFunction(dataRequest) || Array.isArray(dataSource)) {
      return;
    }
    try {
      let pageParams: Recordable = {};
      const pagination = unref(paginationRef)!;

      const { pageField, sizeField, listField, totalField } = {
        ...tableConfig.fetchConfig,
        ...fetchConfig,
      };

      // 是否启用了分页
      const enablePagination = isObject(pagination);
      if (enablePagination) {
        pageParams = {
          [pageField]: pagination.current,
          [sizeField]: pagination.pageSize,
        };
      }
      const { sortInfo = {}, filterInfo } = searchState;
      let queryParams: Recordable = { ...pageParams, ...sortInfo, ...filterInfo, ...params };
      await nextTick();
      if (queryFormRef.value) {
        const values = await queryFormRef.value.validate();
        queryParams = {
          ...queryFormRef.value.handleFormValues(values),
          ...queryParams,
        };
      }

      loadingRef.value = true;
      const res = await dataRequest(queryParams, rest);

      const isArrayResult = Array.isArray(res);
      const resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? res.length : get(res, totalField);

      if (enablePagination && Number(resultTotal)) {
        const { current = 1, pageSize = tableConfig.defaultPageSize } = pagination;
        const currentTotalPage = Math.ceil(resultTotal / pageSize);
        if (current > currentTotalPage) {
          updatePagination({
            current: currentTotalPage,
          });
          return await fetchData(params, rest);
        }
      }
      tableData.value = resultItems;
      return tableData;
    } catch (error) {
      warn(`表格查询出错：${error}`);
      emit('fetch-error', error);
      tableData.value = [];
      updatePagination({ total: 0 });
    } finally {
      loadingRef.value = false;
    }
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
    const [pagination, filters, sorter] = rest;
    const { sortFn, filterFn } = props;

    if (queryFormRef.value) {
      await queryFormRef.value.validate();
    }
    updatePagination(pagination);

    const params: Recordable = {};
    if (sorter && isFunction(sortFn)) {
      const sortInfo = sortFn(sorter);
      searchState.sortInfo = sortInfo;
      params.sortInfo = sortInfo;
    }

    if (filters && isFunction(filterFn)) {
      const filterInfo = filterFn(filters);
      searchState.filterInfo = filterInfo;
      params.filterInfo = filterInfo;
    }

    await fetchData({}, rest);
    emit('change', ...rest);
  };

  // dataIndex 可以为 a.b.c
  // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

  // 获取表格列key
  const getColumnKey = (column: TableColumn) => {
    return (column?.key || column?.dataIndex) as string;
  };

  /** 编辑表单验证失败回调 */
  const handleEditFormValidate: FormProps['onValidate'] = (name, status, errorMsgs) => {
    // console.log('errorInfo', editFormErrorMsgs);
    const key = Array.isArray(name) ? name.join('.') : name;
    if (status) {
      editFormErrorMsgs.value.delete(key);
    } else {
      editFormErrorMsgs.value.set(key, errorMsgs);
    }
  };

  /** 更新表格分页信息 */
  const updatePagination = (info: Pagination = paginationRef.value) => {
    if (isBoolean(info)) {
      paginationRef.value = info;
    } else if (isObject(paginationRef.value)) {
      paginationRef.value = {
        ...paginationRef.value,
        ...info,
      };
    }
  };
  /** 表格无限滚动 */
  const onInfiniteScroll = (
    callback: UseInfiniteScrollParams[1],
    options?: UseInfiniteScrollParams[2],
  ) => {
    const el = getCurrentInstance()?.proxy?.$el.querySelector('.ant-table-body');
    useInfiniteScroll(el, callback, options);
  };

  /**
   * @description当外部需要动态改变搜索表单的值或选项时，需要调用此方法获取dynamicFormRef实例
   */
  const getQueryFormRef = () => queryFormRef.value;

  return {
    ...editableMethods,
    setProps,
    handleSubmit,
    handleTableChange,
    getColumnKey,
    fetchData,
    getQueryFormRef,
    reload,
    onInfiniteScroll,
    handleEditFormValidate,
  };
};
