<template>
  <div>
    <DynamicTable
      ref="dynamicTableRef"
      row-key="id"
      header-title="角色管理"
      :data-request="getRoleListByPage"
      :columns="columns"
      bordered
      size="small"
    >
      <template #toolbar>
        <a-button type="primary" @click="openMenuModal({})"> 新增 </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SystemPermissionRole',
  };
</script>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    getRoleListByPage,
    updateRole,
    createRole,
    deleteRole,
    getRoleInfo,
  } from '@/api/system/role';
  import { getDeptList } from '@/api/system/dept';
  import { getMenuList } from '@/api/system/menu';
  import { DynamicTable } from '@/components/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import { getColumns, TableListItem } from './columns';
  import { roleSchemas } from './formSchemas';
  import { formatDept2Tree, formatMenu2Tree } from '@/core/permission/utils';

  const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>();

  const [showModal] = useFormModal();

  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}角色`,
        width: '50%',
        onFinish: async (values) => {
          console.log('新增/编辑角色', values);
          values.roleId = record.id;
          await (record.id ? updateRole : createRole)(values);
          dynamicTableRef.value?.refreshTable();
        },
      },
      formSchema: {
        labelWidth: 100,
        layout: 'vertical',
        schemas: roleSchemas,
      },
    });

    const [deptData, menuData] = await Promise.all([getDeptList(), getMenuList()]);

    formRef.value?.updateSchema([
      {
        field: 'menus',
        componentProps: { treeData: formatMenu2Tree(menuData) },
      },
      {
        field: 'depts',
        componentProps: { treeData: formatDept2Tree(deptData) },
      },
    ]);
    // 如果是编辑的话，需要获取角色详情
    if (record.id) {
      const data = await getRoleInfo({ roleId: record.id });
      formRef.value?.setFieldsValue({
        ...record,
        name: data.roleInfo.name,
        label: data.roleInfo.label,
        remark: data.roleInfo.remark,
        menus: data.menus.map((n) => n.menuId),
        depts: data.depts.map((n) => n.departmentId),
      });
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteRole({ roleIds: [record.id] });
    dynamicTableRef.value?.refreshTable();
  };

  const columns = getColumns({ openMenuModal, delRowConfirm });
</script>
