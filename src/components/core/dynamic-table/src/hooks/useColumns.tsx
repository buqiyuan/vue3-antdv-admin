import { computed, unref, useSlots } from 'vue';
import { cloneDeep, isFunction, mergeWith } from 'lodash-es';
import { EditableCell } from '../components/';
import { ColumnKeyFlag } from '../types/column';
import type { Slots } from 'vue';
import type {
  TableActionType,
  TableColumn,
  TableMethods,
  TableState,
  DynamicTableProps,
} from '@/components/core/dynamic-table';
import type { FormSchema } from '@/components/core/schema-form';
import { isBoolean } from '@/utils/is';
import { TableAction } from '@/components/core/dynamic-table/src/components';

export type UseTableColumnsContext = {
  state: TableState;
  props: DynamicTableProps;
  methods: TableMethods;
  tableAction: TableActionType;
  slots: Slots;
};

export const useColumns = ({ state, methods, props, tableAction }: UseTableColumnsContext) => {
  const slots = useSlots();
  const { getColumnKey } = methods;
  const { getProps } = state;
  const { isEditable } = tableAction;

  const getColumns = computed<TableColumn<any>[]>(() => {
    const innerProps = { ...unref(getProps) };
    const ColumnKeyFlags = Object.keys(ColumnKeyFlag);
    const columns = cloneDeep(innerProps!.columns!.filter((n) => !n.hideInTable));

    // 是否添加序号列
    if (innerProps?.showIndex) {
      columns.unshift({
        dataIndex: 'ACTION',
        title: '序号',
        width: 60,
        align: 'center',
        fixed: 'left',
        ...innerProps?.indexColumnProps,
        customRender: ({ index }) => {
          const getPagination = unref(state.paginationRef);
          if (isBoolean(getPagination)) {
            return index + 1;
          }
          const { current = 1, pageSize = 10 } = getPagination!;
          return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
        },
      });
    }

    return columns.map((item) => {
      const customRender = item.customRender;

      const columnKey = getColumnKey(item) as string;

      item.customRender = (options) => {
        const { record } = options;
        const rowKey = props.rowKey as string;
        /** 当前行是否开启了编辑行模式 */
        const isEditableRow = isEditable(record[rowKey]);
        /** 当前单元格是否允许被编辑 */
        const isCellEditable = isBoolean(item.editable)
          ? item.editable
          : item.editable?.(options) ?? true;
        const isShowEditable =
          isEditableRow && isCellEditable && !ColumnKeyFlags.includes(columnKey);

        return isShowEditable ? (
          // @ts-ignore
          <EditableCell
            schema={getColumnFormSchema(item, record)}
            rowKey={record[rowKey]}
            v-slots={slots}
          ></EditableCell>
        ) : (
          customRender?.(options)
        );
      };

      // 操作列
      if (item.actions && columnKey === ColumnKeyFlag.ACTION) {
        item.customRender = (columnParams) => {
          // @ts-ignore
          return <TableAction actions={item.actions!(columnParams, tableAction)} />;
        };
      }
      return {
        key: item.key ?? (item.dataIndex as Key),
        dataIndex: item.dataIndex ?? (item.key as Key),
        ...item,
      };
    });
  });

  function mergeCustomizer(objValue, srcValue, key) {
    /** 这里着重处理 `componentProps` 为函数时的合并处理 */
    if (key === 'componentProps') {
      return (...rest) => {
        return {
          ...(isFunction(objValue) ? objValue(...rest) : objValue),
          ...(isFunction(srcValue) ? srcValue(...rest) : srcValue),
        };
      };
    }
  }

  // 获取当前行的form schema
  const getColumnFormSchema = (item: TableColumn, record: Recordable): FormSchema<string> => {
    const key = getColumnKey(item) as string;
    /** 是否继承搜索表单的属性 */
    const isExtendSearchFormProps = !Object.is(
      item.editFormItemProps?.extendSearchFormProps,
      false,
    );

    return {
      field: `${record[props.rowKey as string]}.${item.searchField ?? key}`,
      component: 'Input',
      defaultValue: record[key],
      colProps: {
        span: 24,
      },
      formItemProps: {
        help: '',
      },
      ...(isExtendSearchFormProps
        ? mergeWith(cloneDeep(item.formItemProps), item.editFormItemProps, mergeCustomizer)
        : item.editFormItemProps),
    };
  };

  return {
    getColumns,
  };
};
