<template>
  <Tooltip placement="top">
    <template #title>
      <span>密度</span>
    </template>

    <Popover
      placement="bottomLeft"
      trigger="click"
      @visible-change="handleVisibleChange"
      overlayClassName="cloumn-list"
    >
      <template #title>
        <div class="popover-title">
          <Checkbox
            :indeterminate="indeterminate"
            v-model:checked="checkAll"
            @change="onCheckAllChange"
          >
            列展示
          </Checkbox>

          <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange">
            序号列
          </Checkbox>

          <a-button size="small" type="link" @click="reset"> 重置 </a-button>
        </div>
      </template>

      <template #content>
        <Checkbox.Group v-model:value="checkedList" @change="onChange" ref="columnListRef">
          <template v-for="item in plainOptions" :key="item.value">
            <div class="check-item">
              <DragOutlined class="table-column-drag-icon" />
              <Checkbox :value="item.value">
                {{ item.label }}
              </Checkbox>

              <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4">
                <template #title> 固定到左侧 </template>
                <VerticalLeftOutlined />
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4">
                <template #title> 固定到右侧 </template>
                <VerticalRightOutlined />
              </Tooltip>
            </div>
          </template>
        </Checkbox.Group>
      </template>
      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>

<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { Tooltip, Popover, Checkbox, Divider } from 'ant-design-vue';
  // import type { TableProps } from 'ant-design-vue';
  import {
    SettingOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    DragOutlined,
  } from '@ant-design/icons-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  interface Options {
    label: string;
    value: string;
    fixed?: boolean | 'left' | 'right';
  }

  const table = useTableContext();

  // const cachePlainOptions = ref<Options[]>([]);
  const plainOptions = ref<Options[]>([]);

  // const plainSortOptions = ref<Options[]>([]);

  const columnListRef = ref();
  const checkedList = ref<string[]>([]);
  const checkAll = ref<boolean>(true);
  // const defaultCheckList = ref<string[]>([]);
  const checkIndex = ref<boolean>(false);

  const indeterminate = computed(() => {
    const len = plainOptions.value.length;
    let checkedLen = checkedList.value.length;
    unref(checkIndex) && checkedLen--;
    return checkedLen > 0 && checkedLen < len;
  });

  const handleIndexCheckChange = () => {};

  const onCheckAllChange = () => {};

  const handleVisibleChange = () => {
    table.setProps({});
  };

  const onChange = () => {};
  const reset = () => {};
</script>
