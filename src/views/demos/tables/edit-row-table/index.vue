<template>
  <div>
    <Alert message="可编辑行表格" type="info" show-icon>
      <template #description> 可编辑行表格-可编辑行表格使用示例 </template>
    </Alert>
    <Card title="可编辑行表格基本使用示例" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="tableColumns"
        :editable-type="editableType"
        :on-save="handleSave"
        :on-cancel="handleCancelSave"
        row-key="id"
      >
        <template #toolbar>
          <Select ref="select" v-model:value="editableType">
            <Select.Option value="single">单行编辑</Select.Option>
            <Select.Option value="multiple">多行编辑</Select.Option>
            <Select.Option value="cell">可编辑单元格</Select.Option>
          </Select>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Alert, Card, Select, message } from 'ant-design-vue';
  import { columns, tableData } from './columns';
  import type { EditableType, OnSave, OnCancel } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { waitTime } from '@/utils/common';

  defineOptions({
    name: 'EditRowTable',
  });

  const [DynamicTable] = useTable();

  const editableType = ref<EditableType>('cell');

  const loadData = async (params): Promise<API.TableListResult> => {
    console.log('params', params);
    await waitTime(500);

    return {
      ...params,
      items: tableData,
    };
  };

  const tableColumns = computed<typeof columns>(() => [
    ...columns,
    {
      title: '操作',

      hideInTable: editableType.value === 'cell',
      width: 200,
      dataIndex: 'ACTION',
      actions: ({ record }, action) => {
        const { startEditable, cancelEditable, isEditable, getEditFormModel, validateRow } = action;
        return isEditable(record.id)
          ? [
              {
                label: '保存',
                onClick: async () => {
                  const result = await validateRow(record.id);
                  message.loading({ content: '保存中...', key: record.id });
                  console.log('result', result);
                  console.log('保存', getEditFormModel(record.id));
                  await waitTime(2000);
                  cancelEditable(record.id);
                  message.success({ content: '保存成功!', key: record.id, duration: 2 });
                },
              },
              {
                label: '取消',
                onClick: () => {
                  cancelEditable(record.id);
                },
              },
            ]
          : [
              {
                label: '编辑',
                onClick: () => {
                  startEditable(record.id, record);
                },
              },
            ];
      },
    },
  ]);

  const handleCancelSave: OnCancel = (rowKey, record, originRow) => {
    console.log('handleCancelSave', rowKey, record, originRow);
  };

  const handleSave: OnSave = async (rowKey, record, originRow) => {
    console.log('handleSave', rowKey, record, originRow);
    await waitTime(2000);
  };
</script>

<style lang="less" scoped></style>
