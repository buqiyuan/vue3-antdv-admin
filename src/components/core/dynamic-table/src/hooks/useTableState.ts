import { computed, reactive, ref, unref, watch } from 'vue';
import { omit } from 'lodash-es';
import tableConfig from '../dynamic-table.config';
import { useScroll } from './useScroll';
import type { Slots } from 'vue';
import type { DynamicTableProps } from '../dynamic-table';
import type { SchemaFormInstance } from '@/components/core/schema-form';
import type { TableProps, Table } from 'ant-design-vue';
import { useI18n } from '@/hooks/useI18n';

export type Pagination = TableProps['pagination'];
export type TableState = ReturnType<typeof useTableState>;

export type UseTableStateParams = {
  props: DynamicTableProps;
  slots: Slots;
};

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export const useTableState = ({ props, slots }: UseTableStateParams) => {
  const { t } = useI18n();
  const { scroll } = useScroll({ props });
  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof Table>>();
  /** 查询表单实例 */
  const queryFormRef = ref<SchemaFormInstance>();
  /** 编辑表格的表单实例 */
  const editTableFormRef = ref<SchemaFormInstance>();
  /** 表格数据 */
  const tableData = ref<any[]>([]);
  /** 内部属性 */
  const innerPropsRef = ref<Partial<DynamicTableProps>>();
  /** 分页配置参数 */
  const paginationRef = ref<NonNullable<Pagination>>(false);
  /** 表格加载 */
  const loadingRef = ref<boolean>(!!props.loading);
  /** 编辑表单model */
  const editFormModel = ref<Recordable>({});
  /** 所有验证不通过的表单项 */
  const editFormErrorMsgs = ref(new Map());
  /** 当前所有正在被编辑的行key的格式为：`${recordKey}`  */
  const editableRowKeys = ref(new Set<Key>());
  /** 当前所有正在被编辑的单元格key的格式为：`${recordKey}.${dataIndex}`，仅`editableType`为`cell`时有效  */
  const editableCellKeys = ref(new Set<Key>());
  /** 表格排序或过滤时的搜索参数 */
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });

  if (!Object.is(props.pagination, false)) {
    paginationRef.value = {
      current: 1,
      pageSize: tableConfig.defaultPageSize,
      total: 0,
      pageSizeOptions: [...tableConfig.pageSizeOptions],
      showQuickJumper: true,
      showSizeChanger: true, // 显示可改变每页数量
      showTotal: (total) => t('component.table.total', { total }), // 显示总数
      // onChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      // onShowSizeChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      ...props.pagination,
    };
  }

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) };
  });

  const getBindValues = computed(() => {
    const props = unref(getProps);

    let propsData: Recordable = {
      ...props,
      rowKey: props.rowKey ?? 'id',
      loading: props.loading ?? unref(loadingRef),
      pagination: unref(paginationRef),
      tableLayout: props.tableLayout ?? 'fixed',
      scroll: unref(scroll),
    };
    if (slots.expandedRowRender) {
      propsData = omit(propsData, 'scroll');
    }

    propsData = omit(propsData, ['class', 'onChange', 'columns']);
    return propsData;
  });

  // 如果外界设置了dataSource，那就直接用外界提供的数据
  watch(
    () => props.dataSource,
    (val) => {
      if (val) {
        tableData.value = val;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    () => props.columns,
    (val) => {
      if (val) {
        innerPropsRef.value = {
          ...innerPropsRef.value,
          columns: val,
        };
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  return {
    tableRef,
    editTableFormRef,
    loadingRef,
    tableData,
    queryFormRef,
    innerPropsRef,
    getProps,
    getBindValues,
    paginationRef,
    editFormModel,
    editFormErrorMsgs,
    editableCellKeys,
    editableRowKeys,
    searchState,
  };
};
