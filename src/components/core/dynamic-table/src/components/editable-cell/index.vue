<template>
  <a-spin :spinning="saving">
    <div class="editable-cell">
      <a-popover :open="!!errorMsgs?.length" placement="topRight">
        <template #content>
          <template v-for="err in errorMsgs" :key="err">
            <a-typography-text type="danger">{{ err }}</a-typography-text>
          </template>
        </template>
        <a-row type="flex" :gutter="8">
          <SchemaFormItem
            v-if="(getIsEditable || getIsCellEdit) && getSchema"
            v-model:form-model="editFormModel"
            :schema="getSchema"
            :table-instance="tableContext"
            :table-row-key="rowKey"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
              <slot :name="item" v-bind="data || {}" />
            </template>
          </SchemaFormItem>
          <a-col v-if="getIsCellEdit" :span="4" class="!flex items-center">
            <CheckOutlined @click="handleSaveCell" />
            <CloseOutlined @click="handleCancelSaveCell" />
          </a-col>
        </a-row>
      </a-popover>
      <template v-if="!isCellEdit && editableType === 'cell'">
        <slot />
        <EditOutlined @click="startEditCell" />
      </template>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
  import { useTableContext } from '../../hooks';
  import type { PropType } from 'vue';
  import type { CustomRenderParams, EditableType } from '@/components/core/dynamic-table/src/types';
  import { schemaFormItemProps, SchemaFormItem } from '@/components/core/schema-form';
  import { isPromise } from '@/utils/is';

  const props = defineProps({
    ...schemaFormItemProps,
    rowKey: [String, Number] as PropType<Key>,
    editableType: [String] as PropType<EditableType>,
    column: [Object] as PropType<CustomRenderParams>,
  });
  const saving = ref(false);
  const isCellEdit = ref(props.column?.column?.defaultEditable);

  const tableContext = useTableContext();
  const {
    editFormModel,
    editTableFormRef,
    editFormErrorMsgs,
    editableCellKeys,
    isEditable,
    startCellEditable,
    cancelCellEditable,
    validateCell,
  } = tableContext;

  const dataIndex = computed(() => {
    return String(props.column?.column?.dataIndex);
  });

  const getSchema = computed(() => {
    const field = props.schema.field;
    const schema = editTableFormRef.value?.getSchemaByFiled(field) || props.schema;
    return {
      ...schema,
      colProps: {
        ...schema.colProps,
        span: props.editableType === 'cell' ? 20 : 24,
      },
    };
  });

  const getIsEditable = computed(() => {
    return props.rowKey && isEditable(props.rowKey);
  });

  const getIsCellEdit = computed(() => {
    const { rowKey } = props;
    return (
      isCellEdit.value &&
      props.editableType === 'cell' &&
      editableCellKeys.value.has(`${rowKey}.${dataIndex.value}`)
    );
  });

  const errorMsgs = computed(() => {
    const field = props.schema.field;
    return editFormErrorMsgs.value.get(field);
  });

  const startEditCell = () => {
    startCellEditable(props.rowKey!, dataIndex.value, props.column?.record);
    isCellEdit.value = true;
  };

  const handleSaveCell = async () => {
    const { rowKey, column } = props;
    await validateCell(rowKey!, dataIndex.value);
    const saveRes = tableContext.onSave?.(rowKey!, editFormModel.value[rowKey!], column?.record);
    if (isPromise(saveRes)) {
      saving.value = true;
      await saveRes.finally(() => (saving.value = false));
    }
    cancelCellEditable(rowKey!, dataIndex.value);
    isCellEdit.value = false;
  };

  const handleCancelSaveCell = () => {
    const { rowKey, column } = props;
    tableContext?.onCancel?.(rowKey!, editFormModel.value[rowKey!], column?.record);
    isCellEdit.value = false;
    cancelCellEditable(props.rowKey!, dataIndex.value);
  };

  // 默认开启编辑的单元格
  if (isCellEdit.value && props.editableType === 'cell') {
    startEditCell();
  }
</script>

<style lang="less">
  .ant-table-cell:hover {
    .editable-cell .anticon-edit {
      display: block;
    }
  }
</style>

<style lang="less" scoped>
  .editable-cell {
    position: relative;

    .anticon-edit {
      display: none;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  :deep(.ant-form-item) {
    margin: 0;
  }

  :deep(.ant-form-item-explain) {
    display: none;
  }

  :deep(.ant-form-item-with-help) {
    margin: 0;
  }
</style>
