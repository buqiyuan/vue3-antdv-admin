<template>
  <div>
    <DynamicTable
      ref="dynamicTableRef"
      row-key="id"
      header-title="菜单管理"
      :data-request="loadTableData"
      :columns="columns"
      bordered
      size="small"
      :search="false"
      :pagination="false"
      :scroll="{ x: 2000 }"
    >
      <template #toolbar>
        <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="openMenuModal({})">
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SysMenu',
  };
</script>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { TreeSelectProps } from 'ant-design-vue';
  import { getMenuList, updateMenu, createMenu, deleteMenu } from '@/api/system/menu';
  import { DynamicTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { menuSchemas } from './formSchemas';
  import { formatMenu2Tree } from '@/core/permission/utils';
  import { cloneDeep } from 'lodash-es';

  const menuTree = ref<TreeSelectProps['treeData']>([]);
  const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>();

  const [showModal] = useFormModal();

  const loadTableData = async () => {
    const data = await getMenuList();
    menuTree.value = formatMenu2Tree(
      cloneDeep(data).filter((n) => n.type !== 2),
      null,
    );

    return { list: formatMenu2Tree(cloneDeep(data), null) };
  };

  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal<any>({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}菜单`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑菜单', values);
          values.menuId = record.id;
          values.perms = values.perms?.join(',');
          await (record.id ? updateMenu : createMenu)(values);
          dynamicTableRef.value?.refreshTable();
        },
      },
      formSchema: {
        labelWidth: 100,
        layout: 'vertical',
        schemas: menuSchemas,
      },
    });

    formRef.value?.updateSchema([
      {
        field: 'parentId',
        componentProps: {
          treeDefaultExpandedKeys: [-1].concat(record?.keyPath || []),
          treeData: [{ key: -1, name: '一级菜单', children: menuTree.value }],
        },
      },
    ]);

    formRef.value?.setFieldsValue({
      ...record,
      perms: record.perms?.split(','),
      parentId: record.parentId ?? -1,
    });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteMenu({ menuId: record.id });
    dynamicTableRef.value?.refreshTable();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 160,
      dataIndex: '$action',
      hideInSearch: true,
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'sys.menu.update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
          auth: 'sys.menu.delete',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
