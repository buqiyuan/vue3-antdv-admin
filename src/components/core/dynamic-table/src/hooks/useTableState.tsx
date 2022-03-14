import { computed, ref, unref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { isBoolean, omit } from 'lodash-es';
import { Table } from 'ant-design-vue';
import type { Slots } from 'vue';
import type { DynamicTableProps } from '../dynamic-table';
import type { SchemaFormInstance } from '@/components/core/schema-form';
import type { TableProps } from 'ant-design-vue';
import type { TableColumn } from '../../types/column';

export type Pagination = TableProps['pagination'];
export type TableState = ReturnType<typeof useTableState>;

export type UseTableStateParams = {
  props: DynamicTableProps;
  slots: Slots;
};

export const useTableState = ({ props, slots }: UseTableStateParams) => {
  const { t } = useI18n();

  const tableRef = ref<InstanceType<typeof Table>>();
  // 表格加载
  const loadingRef = ref<boolean>(!!props.loading);
  const tableData = ref<any[]>([]);
  const queryFormRef = ref<SchemaFormInstance>();

  const innerPropsRef = ref<Partial<DynamicTableProps>>();

  // 分页配置参数
  const paginationRef = ref<Pagination>(false);

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
      loading: unref(loadingRef),
      tableLayout: 'fixed',
      pagination: unref(paginationRef),
    };
    if (slots.expandedRowRender) {
      propsData = omit(propsData, 'scroll');
    }

    propsData = omit(propsData, ['class', 'onChange']);
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
    loadingRef,
    tableData,
    queryFormRef,
    innerPropsRef,
    getProps,
    getBindValues,
    paginationRef,
  };
};
