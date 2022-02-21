<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ $t('component.table.settingColumn') }}</span>
    </template>
    <Popover
      placement="bottomLeft"
      trigger="click"
      @visible-change="handleVisibleChange"
      overlayClassName="cloumn-list"
    >
      <template #title>
        <div class="popover-title">
          <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll">
            {{ $t('component.table.settingColumnShow') }}
          </Checkbox>
          <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange">
            {{ $t('component.table.settingIndexColumnShow') }}
          </Checkbox>
          <Checkbox v-model:checked="checkBordered" @change="handleBorderedCheckChange">
            {{ $t('component.table.settingBordered') }}
          </Checkbox>
          <a-button size="small" type="link" @click="reset">
            {{ $t('common.resetText') }}
          </a-button>
        </div>
      </template>
      <template #content>
        <div ref="columnListRef">
          <template v-for="item in tableColumns" :key="table.getColumnKey(item)">
            <div class="check-item">
              <div style="padding: 4px 16px 8px 0">
                <DragOutlined class="table-column-drag-icon pr-6px cursor-move" />
                <Checkbox
                  v-model:checked="item.hideInTable"
                  :true-value="false"
                  :false-value="true"
                >
                  {{ item.title }}
                </Checkbox>
              </div>
              <div class="column-fixed">
                <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4">
                  <template #title> {{ $t('component.table.settingFixedLeft') }} </template>
                  <VerticalRightOutlined
                    class="fixed-left"
                    :class="{ active: item.fixed === 'left' }"
                    @click="handleColumnFixed(item, 'left')"
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4">
                  <template #title> {{ $t('component.table.settingFixedRight') }} </template>
                  <VerticalLeftOutlined
                    class="fixed-right"
                    :class="{ active: item.fixed === 'right' }"
                    @click="handleColumnFixed(item, 'right')"
                  />
                </Tooltip>
              </div>
            </div>
          </template>
        </div>
      </template>
      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>

<script lang="ts" setup>
  import { computed, nextTick, ref, unref, watchEffect } from 'vue';
  import { Tooltip, Popover, Divider } from 'ant-design-vue';
  import {
    SettingOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    DragOutlined,
  } from '@ant-design/icons-vue';
  import { useTableContext } from '../../hooks/useTableContext';
  import { cloneDeep } from 'lodash-es';
  import Checkbox from '@/components/basic/check-box/index.vue';
  import type { TableColumn } from '../../typing';
  import { useSortable } from '@/hooks/useSortable';
  import { isNullAndUnDef } from '@/utils/is';

  const table = useTableContext();
  let inited = false;
  const defaultColumns = cloneDeep(table.columns);
  const defaultShowIndex = !!table.showIndex;
  const defaultBordered = table.bordered;

  const tableColumns = ref<TableColumn<any>[]>([]);

  const checkAll = computed<boolean>({
    get() {
      return tableColumns.value.length > 0 && tableColumns.value.every((n) => !n.hideInTable);
    },
    set(value) {
      tableColumns.value.forEach((item) => (item.hideInTable = !value));
    },
  });

  const checkIndex = ref(defaultShowIndex);
  const checkBordered = ref(table.bordered);
  const columnListRef = ref<HTMLDivElement>();

  // 初始化选中状态
  const initCheckStatus = () => {
    tableColumns.value = cloneDeep(defaultColumns);
    checkIndex.value = defaultShowIndex;
    checkBordered.value = defaultBordered;
    tableColumns.value.forEach((item) => (item.hideInTable ??= false));
  };
  initCheckStatus();

  const indeterminate = computed(() => {
    return (
      tableColumns.value.length > 0 &&
      tableColumns.value.some((n) => n.hideInTable) &&
      tableColumns.value.some((n) => !n.hideInTable)
    );
  });

  watchEffect(() => {
    table.setProps({ columns: tableColumns.value });
  });
  // 设置序号列
  const handleIndexCheckChange = (e) => {
    table.setProps({ showIndex: e.target.checked });
  };
  // 设置边框
  const handleBorderedCheckChange = (e) => {
    table.setProps({ bordered: e.target.checked });
  };

  const handleColumnFixed = (columItem: TableColumn<any>, direction: 'left' | 'right') => {
    columItem.fixed = columItem.fixed === direction ? false : direction;
  };

  async function handleVisibleChange() {
    if (inited) return;
    await nextTick();
    const columnListEl = unref(columnListRef);
    if (!columnListEl) return;

    // Drag and drop sort
    const { initSortable } = useSortable(columnListEl, {
      handle: '.table-column-drag-icon',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
          return;
        }
        // Sort column
        const columns = tableColumns.value;
        columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
      },
    });
    initSortable();
    inited = true;
  }

  const reset = () => {
    initCheckStatus();
    table.setProps({ showIndex: defaultShowIndex, bordered: defaultBordered });
  };
</script>

<style lang="less" scoped>
  .check-item {
    @apply flex justify-between;
  }
  .column-fixed {
    .fixed-right,
    .fixed-left {
      &.active,
      &:hover {
        color: #1890ff;
      }
    }
  }
</style>
