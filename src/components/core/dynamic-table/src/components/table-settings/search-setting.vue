<template>
  <template v-if="formSchemas?.length && search">
    <Tooltip placement="top">
      <template #title>
        <span>{{ getProps.search ? '隐藏搜索' : '显示搜索' }}</span>
      </template>
      <SearchOutlined @click="toggle" />
    </Tooltip>
  </template>
</template>
<script lang="ts" setup>
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  const { getProps, setProps, formSchemas, search } = useTableContext();

  function toggle() {
    setProps({
      search: !getProps.value.search,
    });
  }
</script>
