<template>
  <template v-if="formSchemas?.length && tableProps.search">
    <Tooltip placement="top">
      <template #title>
        <span>{{ innerPropsRef.search ? '隐藏搜索' : '显示搜索' }}</span>
      </template>
      <SearchOutlined @click="toggle" />
    </Tooltip>
  </template>
</template>
<script lang="ts" setup>
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  const { tableProps, innerPropsRef, setProps, formSchemas } = useTableContext();

  function toggle() {
    setProps({
      search: !innerPropsRef.value.search,
    });
  }
</script>
