<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ $t('component.table.settingDens') }}</span>
    </template>

    <Dropdown placement="bottomCenter" :trigger="['click']">
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu v-model:selectedKeys="selectedKeysRef" selectable @click="handleMenuClick">
          <Menu.Item key="large">
            <span>{{ $t('component.table.settingDensDefault') }}</span>
          </Menu.Item>
          <Menu.Item key="middle">
            <span>{{ $t('component.table.settingDensMiddle') }}</span>
          </Menu.Item>
          <Menu.Item key="small">
            <span>{{ $t('component.table.settingDensSmall') }}</span>
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ColumnHeightOutlined } from '@ant-design/icons-vue';
  import { Tooltip, Dropdown, Menu } from 'ant-design-vue';
  import { useTableContext } from '../../hooks/useTableContext';
  import type { TableProps } from 'ant-design-vue/es/table/Table';

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
