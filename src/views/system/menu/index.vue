<template>
  <DynamicTable header-title="菜单管理" :data-request="Api.systemMenu.menuList" :columns="columns">
    <template #afterHeaderTitle>
      <div class="flex gap-2 ml-2">
        <a-button @click="dynamicTableInstance.expandAll">展开全部</a-button>
        <a-button @click="dynamicTableInstance.collapseAll">折叠全部</a-button>
      </div>
    </template>
    <template #toolbar>
      <a-button type="primary" :disabled="!$auth('system:menu:create')" @click="openMenuModal({})">
        新增
      </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="tsx" setup>
  import { getCurrentInstance } from 'vue';
  import { useResizeObserver } from '@vueuse/core';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { useMenuSchemas } from './formSchemas';
  import Api from '@/api/';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';

  defineOptions({
    name: 'SysMenu',
  });
  const [DynamicTable, dynamicTableInstance] = useTable({
    pagination: false,
    size: 'small',
    rowKey: 'id',
    bordered: true,
    autoHeight: true,
  });
  const [showModal] = useFormModal();
  const currentInstance = getCurrentInstance();

  useResizeObserver(document.documentElement, () => {
    const el = currentInstance?.proxy?.$el as HTMLDivElement;
    if (el) {
      dynamicTableInstance.setProps({
        scroll: { x: window.innerWidth > 2000 ? el.offsetWidth - 20 : 2000 },
      });
    }
  });

  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}菜单`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑菜单', values);
          record.id && (values.menuId = record.id);
          if (Array.isArray(values.component)) {
            values.component = values.component.join('/');
          }
          if (Array.isArray(values.permission)) {
            values.permission = values.permission.join(':');
          }
          if (values.parentId === -1) {
            Reflect.deleteProperty(values, 'parentId');
          }
          if (record.id) {
            await Api.systemMenu.menuUpdate({ id: record.id }, values);
          } else {
            await Api.systemMenu.menuCreate(values);
          }
          dynamicTableInstance.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: useMenuSchemas(),
      },
    });

    formRef?.setFieldsValue({
      ...record,
      icon: record.icon ?? '',
      parentId: record.parentId ?? -1,
      component: record.component?.split('/'),
    });
    console.log('record', record);
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemMenu.menuDelete({ id: record.id });
    dynamicTableInstance.reload();
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 160,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'system:menu:update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '新增',
          auth: {
            perm: 'system:menu:create',
            effect: 'disable',
          },
          disabled: record.type === 2 || record.status === 0,
          onClick: () => openMenuModal({ parentId: record.id }),
        },
        {
          label: '删除',
          auth: 'system:menu:delete',
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
