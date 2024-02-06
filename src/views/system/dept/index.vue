<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="部门管理"
      :data-request="Api.systemDept.deptList"
      :columns="columns"
      bordered
      size="small"
    >
      <template #afterHeaderTitle>
        <div class="flex gap-2 ml-2">
          <a-button @click="dynamicTableInstance.expandAll">展开全部</a-button>
          <a-button @click="dynamicTableInstance.collapseAll">折叠全部</a-button>
        </div>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!$auth('system:dept:create')"
          @click="openMenuModal({})"
        >
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { roleSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import Api from '@/api/';

  defineOptions({
    name: 'SystemDept',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();

  /**
   * @description 打开新增/编辑弹窗
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}部门`,
        width: '50%',
        onFinish: async (values) => {
          console.log('新增/编辑部门', values);
          if (record.id) {
            await Api.systemDept.deptUpdate({ id: record.id }, values);
          } else {
            await Api.systemDept.deptCreate(values);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: roleSchemas,
      },
    });
    formRef?.setFieldsValue({
      ...record,
      parentId: record.parent?.id,
    });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemDept.deptDelete({ id: record.id });
    dynamicTableInstance?.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 130,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'system:dept:update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
          auth: 'system:dept:delete',
          popConfirm: {
            title: '你确定要删除吗？',
            placement: 'left',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
