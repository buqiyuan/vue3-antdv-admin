import { ref, watchEffect, unref, useSlots, h } from 'vue';
import { cloneDeep, isFunction, mergeWith } from 'lodash-es';
import { Input } from 'ant-design-vue';
import { EditableCell } from '../components';
import { ColumnKeyFlag, columnKeyFlags, type CustomRenderParams } from '../types/column';
import tableConfig from '../dynamic-table.config';
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
  const innerColumns = ref(props.columns);
  const { getColumnKey } = methods;
  const { getProps } = state;
  const { isEditable } = tableAction;

  watchEffect(() => {
    const innerProps = { ...unref(getProps) };

    const columns = cloneDeep(innerProps!.columns!.filter((n) => !n.hideInTable));

    // 是否添加序号列
    if (innerProps?.showIndex) {
      // @ts-ignore
      columns.unshift({
        dataIndex: ColumnKeyFlag.INDEX,
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
      } as TableColumn);
    }

    // @ts-ignore
    innerColumns.value = columns.map((item) => {
      const customRender = item.customRender;

      const rowKey = props.rowKey as string;
      const columnKey = getColumnKey(item) as string;

      item.align ||= tableConfig.defaultAlign;

      item.customRender = (options) => {
        const { record, index, text } = options as CustomRenderParams<Recordable<any>>;
        /** 当前行是否开启了编辑行模式 */
        const isEditableRow = isEditable(record[rowKey]);
        /** 是否开启了单元格编辑模式 */
        const isEditableCell = innerProps.editableType === 'cell';
        /** 当前单元格是否允许被编辑 */
        const isCellEditable = isBoolean(item.editable)
          ? item.editable
          : item.editable?.(options) ?? true;
        /** 是否允许被编辑 */
        const isShowEditable =
          (isEditableRow || isEditableCell) &&
          isCellEditable &&
          !columnKeyFlags.includes(columnKey);

        return isShowEditable
          ? h(
              EditableCell,
              {
                schema: getColumnFormSchema(item, record) as any,
                rowKey: record[rowKey] ?? index,
                editableType: innerProps.editableType,
                column: options,
              },
              { default: () => customRender?.(options) ?? text, ...slots },
            )
          : customRender?.(options);
      };

      // 操作列
      if (item.actions && columnKey === ColumnKeyFlag.ACTION) {
        item.customRender = (options) => {
          const { record, index } = options;
          return h(TableAction, {
            actions: item.actions!(options, tableAction),
            rowKey: record[rowKey] ?? index,
            columnParams: options,
          });
        };
      }
      return {
        key: item.key ?? (item.dataIndex as Key),
        dataIndex: item.dataIndex ?? (item.key as Key),
        ...item,
      } as TableColumn;
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

  /** 获取当前行的form schema */
  const getColumnFormSchema = (item: TableColumn, record: Recordable): FormSchema => {
    const key = getColumnKey(item) as string;
    /** 是否继承搜索表单的属性 */
    const isExtendSearchFormProps = !Object.is(
      item.editFormItemProps?.extendSearchFormProps,
      false,
    );

    return {
      field: `${record[props.rowKey as string]}.${item.searchField ?? key}`,
      component: () => Input,
      defaultValue: record[key],
      colProps: {
        span: unref(getProps).editableType === 'cell' ? 20 : 24,
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
    innerColumns,
  };
};
