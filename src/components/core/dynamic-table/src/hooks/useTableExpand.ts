import { computed, unref, toRaw, ref } from 'vue';
import type {
  TableState,
  DynamicTableProps,
  DynamicTableEmitFn,
} from '@/components/core/dynamic-table';

type UseTableExpandContext = {
  state: TableState;
  props: DynamicTableProps;
  emit: DynamicTableEmitFn;
};

export function useTableExpand({ state, props, emit }: UseTableExpandContext) {
  const { tableData } = state;
  // 表格为树形结构时 展开的行
  const expandedRowKeys = ref<Key[]>([]);

  const isTreeTable = computed(() => {
    const { childrenColumnName = 'children' } = props;
    /**
     * https://github.com/ant-design/ant-design/issues/42722
     * 目前官方树表格符合条件则会自动开启，且没有直接提供相应的关闭树状表格的 API，官方建议关闭树狀表格的方式
     * 是自己处理数据，将数据中的 children 字段设置为 null 则会关闭树状表格。
     */
    return tableData.value.some((item) => {
      return Array.isArray(item[childrenColumnName]) && item[childrenColumnName].length;
    });
  });

  const getExpandOption = computed(() => {
    if (!isTreeTable.value) return {};

    return {
      expandedRowKeys: unref(expandedRowKeys),
      onExpandedRowsChange: (keys: string[]) => {
        expandedRowKeys.value = keys;
        emit('expanded-rows-change', keys);
      },
    };
  });

  function expandAll() {
    const keys = getAllKeys();
    expandedRowKeys.value = keys;
  }

  function expandRows(keys: (string | number)[]) {
    if (!isTreeTable.value) return;
    expandedRowKeys.value = [...expandedRowKeys.value, ...keys];
  }

  function getAllKeys(data?: Recordable[]) {
    const keys: string[] = [];
    const { childrenColumnName, rowKey } = props;
    toRaw(data || unref(tableData)).forEach((item) => {
      keys.push(item[rowKey as string]);
      const children = item[childrenColumnName || 'children'];
      if (children?.length) {
        keys.push(...getAllKeys(children));
      }
    });
    return keys;
  }

  function collapseAll() {
    expandedRowKeys.value = [];
  }

  return { getExpandOption, expandAll, expandRows, collapseAll };
}
