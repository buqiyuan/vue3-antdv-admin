import { computed, ref, unref, watchEffect } from 'vue';
import { omit } from 'lodash-es';
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

export const useTableState = ({ props, slots }: UseTableStateParams) => {
  const { t } = useI18n();
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

  if (!Object.is(props.pagination, false)) {
    paginationRef.value = {
      current: 1,
      pageSize: 10,
      total: 0,
      pageSizeOptions: ['10', '20', '50', '100'],
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
      loading: unref(loadingRef),
      tableLayout: 'fixed',
      pagination: unref(paginationRef),
    };
    if (slots.expandedRowRender) {
      propsData = omit(propsData, 'scroll');
    }

    propsData = omit(propsData, ['class', 'onChange', 'columns']);
    return propsData;
  });

  // 如果外界设置了dataSource，那就直接用外界提供的数据
  watchEffect(() => {
    if (props.dataSource) {
      tableData.value = props.dataSource;
    }
  });

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
  };
};
