<template>
  <Tooltip placement="top">
    <template #title>
      <span>密度</span>
    </template>

    <Dropdown placement="bottomCenter" :trigger="['click']">
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu @click="handleMenuClick" selectable v-model:selectedKeys="selectedKeysRef">
          <Menu.Item key="large">
            <span>默认</span>
          </Menu.Item>
          <Menu.Item key="middle">
            <span>中等</span>
          </Menu.Item>
          <Menu.Item key="small">
            <span>紧凑</span>
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Tooltip, Dropdown, Menu } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue/lib/table/Table';
  import { ColumnHeightOutlined } from '@ant-design/icons-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  type SizeType = NonNullable<TableProps['size']>;

  const table = useTableContext();

  const selectedKeysRef = ref<SizeType[]>([table.getProps?.size || 'large']);

  function handleMenuClick({ key }: { key: SizeType }) {
    selectedKeysRef.value = [key];
    table.setProps({
      size: key,
    });
  }
</script>
