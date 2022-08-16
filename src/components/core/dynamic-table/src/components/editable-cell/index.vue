<template>
  <Popover :visible="!!errorMsgs?.length" placement="topRight">
    <template #content>
      <template v-for="err in errorMsgs" :key="err">
        <Typography.Text type="danger">{{ err }}</Typography.Text>
      </template>
    </template>
    <SchemaFormItem
      v-if="getIsEditable && getSchema"
      :key="rowKey"
      :schema="getSchema"
      :form-model="editFormModel"
      :table-instance="tableContext"
      :table-row-key="rowKey"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </SchemaFormItem>
  </Popover>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Popover, Typography } from 'ant-design-vue';
  import { useTableContext } from '../../hooks';
  import type { PropType } from 'vue';
  import { schemaFormItemProps, SchemaFormItem } from '@/components/core/schema-form';

  defineOptions({
    name: 'EditableCell',
  });

  const props = defineProps({
    ...schemaFormItemProps,
    rowKey: [String, Number] as PropType<Key>,
  });

  const tableContext = useTableContext();
  const { editFormModel, editTableFormRef, editFormErrorMsgs, isEditable } = tableContext;

  const getSchema = computed(() => {
    const field = props.schema.field;
    return editTableFormRef.value?.getSchemaByFiled(field) || props.schema;
  });

  const getIsEditable = computed(() => {
    return props.rowKey && isEditable(props.rowKey);
  });

  const errorMsgs = computed(() => {
    const field = props.schema.field;
    return editFormErrorMsgs.value.get(field);
  });
</script>

<style lang="less" scoped>
  :deep(.ant-form-item-explain) {
    display: none;
  }

  :deep(.ant-form-item-with-help) {
    margin: 0;
  }
</style>
