<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="角色管理"
      :data-request="getRoleListByPage"
      :columns="columns"
      bordered
      size="small"
    >
      <template #toolbar>
        <a-button type="primary" :disabled="!$auth('sys.role.add')" @click="openMenuModal({})">
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { roleSchemas } from './formSchemas';
  import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import {
    getRoleListByPage,
    updateRole,
    createRole,
    deleteRole,
    getRoleInfo,
  } from '@/api/system/role';
  import { getDeptList } from '@/api/system/dept';
  import { getMenuList } from '@/api/system/menu';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import { formatDept2Tree, formatMenu2Tree } from '@/core/permission/utils';

  defineOptions({
    name: 'SystemPermissionRole',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  const [showModal] = useFormModal();

  const getCheckedKeys = (checkedList: number[], options: TreeDataItem[], total = []) => {
    return options.reduce<number[]>((prev, curr) => {
      if (curr.children?.length) {
        getCheckedKeys(checkedList, curr.children, total);
      } else {
        if (checkedList.includes(curr.value)) {
          prev.push(curr.value);
        }
      }
      return prev;
    }, total);
  };

  /**
   * @description 打开新增/编辑弹窗
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal<API.UpdateRoleParams>({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}角色`,
        width: '50%',
        onFinish: async (values) => {
          record.id && (values.roleId = record.id);
          const menusRef = formRef?.compRefMap.get('menus')!;
          const deptsRef = formRef?.compRefMap.get('depts')!;
          const params = {
            ...values,
            menus: [...menusRef.halfCheckedKeys, ...menusRef.checkedKeys],
            depts: [...deptsRef.halfCheckedKeys, ...deptsRef.checkedKeys],
          };
          console.log('新增/编辑角色', params);
          await (record.id ? updateRole : createRole)(params);
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: roleSchemas,
      },
    });

    const [deptData, menuData] = await Promise.all([getDeptList(), getMenuList()]);

    const menuTree = formatMenu2Tree(menuData);
    const deptTree = formatDept2Tree(deptData);

    formRef?.updateSchema([
      {
        field: 'menus',
        componentProps: { treeData: menuTree },
      },
      {
        field: 'depts',
        componentProps: { treeData: deptTree },
      },
    ]);
    // 如果是编辑的话，需要获取角色详情
    if (record.id) {
      const data = await getRoleInfo({ roleId: record.id });
      const menuIds = data.menus.map((n) => n.menuId);
      const deptIds = data.depts.map((n) => n.departmentId);

      formRef?.setFieldsValue({
        ...record,
        name: data.roleInfo.name,
        label: data.roleInfo.label,
        remark: data.roleInfo.remark,
        menus: getCheckedKeys(menuIds, menuTree),
        depts: getCheckedKeys(deptIds, deptTree),
      });
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteRole({ roleIds: [record.id] });
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
            perm: 'sys.role.update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
          auth: 'sys.role.delete',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
