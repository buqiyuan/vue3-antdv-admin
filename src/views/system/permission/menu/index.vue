<template>
  <div>
    <DynamicTable header-title="菜单管理" :data-request="loadTableData" :columns="columns">
      <template #toolbar>
        <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="openMenuModal({})">
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="tsx" setup>
  import { ref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { useMenuSchemas } from './formSchemas';
  import type { TreeSelectProps } from 'ant-design-vue';
  import { getMenuList, updateMenu, createMenu, deleteMenu } from '@/api/system/menu';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import { formatMenu2Tree } from '@/core/permission/utils';

  defineOptions({
    name: 'SysMenu',
  });

  const menuTree = ref<TreeSelectProps['treeData']>([]);
  const [DynamicTable, dynamicTableInstance] = useTable({
    search: false,
    pagination: false,
    size: 'small',
    rowKey: 'id',
    bordered: true,
    scroll: { x: 2000 },
  });
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
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}菜单`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑菜单', values);
          record.id && (values.menuId = record.id);
          if (values.type === 1 && values.viewPath?.length) {
            values.viewPath = values.viewPath.join('/');
          }
          if (values.type === 2 && values.perms?.length) {
            values.perms = values.perms.map((n) => n.join(':')).toString();
          }
          await (record.id ? updateMenu : createMenu)(values);
          dynamicTableInstance.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: useMenuSchemas(),
      },
    });

    formRef?.updateSchema([
      {
        field: 'parentId',
        componentProps: {
          treeDefaultExpandedKeys: [-1].concat(record?.keyPath || []),
          treeData: ref([{ id: -1, name: '一级菜单', children: menuTree.value }]),
        },
      },
    ]);

    formRef?.setFieldsValue({
      ...record,
      icon: record.icon ?? '',
      perms: record.perms
        ?.split(',')
        .filter(Boolean)
        .map((n) => n.split(':')),
      viewPath: record.viewPath?.split('/'),
      parentId: record.parentId ?? -1,
    });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteMenu({ menuId: record.id });
    dynamicTableInstance.reload();
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
