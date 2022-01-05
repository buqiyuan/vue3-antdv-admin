<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ $t('common.redo') }}</span>
    </template>
    <RedoOutlined @click="redo" />
  </Tooltip>
</template>
<script lang="ts" setup>
  import { Tooltip } from 'ant-design-vue';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  const table = useTableContext();

  function redo() {
    table.refreshTable();
  }
</script>
