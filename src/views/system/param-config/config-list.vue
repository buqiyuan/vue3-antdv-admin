<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="参数列表"
      :data-request="getParamConfigList"
      :columns="columns"
      bordered
      :search="false"
      size="small"
    >
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!$auth('sys.param-config.add')"
          @click="openMenuModal({})"
        >
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { baseColumns } from './columns';
  import { getSchemas } from './formSchemas';
  import type { TableListItem, TableColumnItem } from './columns';
  import {
    createParamConfig,
    getParamConfigList,
    getParamConfigInfo,
    updateParamConfig,
    deleteParamConfig,
  } from '@/api/system/param-config';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';

  defineOptions({
    name: 'SystemParamConfig',
  });

  const [DynamicTable, dynamicTableInstance] = useTable({ scroll: { x: 1600 } });
  const [showModal] = useFormModal();

  /**
   * @description 打开新增/编辑弹窗
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal<API.UpdateParamConfigParams & API.CreateParamConfigParams>({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}参数配置`,
        width: '50%',
        onFinish: async (values) => {
          if (record.id) {
            values.id = record.id;
            Reflect.deleteProperty(values, 'key');
          }
          await (record.id ? updateParamConfig : createParamConfig)(values);
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: getSchemas(record.id),
      },
    });
    if (record.id) {
      const data = await getParamConfigInfo({ id: record.id });
      formRef?.setFieldsValue(data);
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteParamConfig({ ids: [record.id] });
    dynamicTableInstance?.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 160,
      dataIndex: 'ACTION',
      hideInSearch: true,
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'sys.param-config.update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
          auth: 'sys.param-config.delete',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
