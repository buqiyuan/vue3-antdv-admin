<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="字典项管理"
      :data-request="Api.systemDictItem.dictItemList"
      :columns="columns"
      bordered
      size="small"
      :search-params="{ typeId }"
    >
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!$auth('system:dict-item:create')"
          @click="openMenuModal({})"
        >
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    baseColumns,
    getSearchFormSchemas,
    type TableListItem,
    type TableColumnItem,
  } from './columns';
  import { getBaseSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import Api from '@/api/';
  import { useTabsViewStore } from '@/store/modules/tabsView';

  defineOptions({
    name: 'SystemDictItem',
  });

  const tabsViewStore = useTabsViewStore();
  const route = useRoute();
  const typeId = ref(Number(route.params.id));
  const dictTypeList = ref<any[]>([]);

  const data = await Api.systemDictType.dictTypeGetAll();
  dictTypeList.value = data.map((n) => ({ label: n.name, value: n.id, code: n.code }));

  onMounted(() => {
    const targetDict = data.find((n) => n.id === typeId.value);
    tabsViewStore.updateTabTitle(`${route.meta.title}(${targetDict?.name})`);
  });

  const [DynamicTable, dynamicTableInstance] = useTable({
    formProps: {
      schemas: getSearchFormSchemas(dictTypeList.value, handleDictTypeChange),
      initialValues: { typeId: typeId.value },
      onReset(model) {
        if (Number.isInteger(model?.typeId)) {
          typeId.value = model.typeId;
        }
      },
    },
  });

  const [showModal] = useFormModal();

  /**
   * @description 打开新增/编辑弹窗
   */
  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}字典项`,
        width: '50%',
        onFinish: async (values) => {
          console.log('新增/编辑字典', values);
          if (record.id) {
            await Api.systemDictItem.dictItemUpdate({ id: record.id }, values);
          } else {
            await Api.systemDictItem.dictItemCreate(values);
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 120,
        schemas: getBaseSchemas(dictTypeList.value, typeId.value),
      },
    });
    formRef?.setFieldsValue({
      ...record,
    });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await Api.systemDictItem.dictItemDelete({ id: record.id });
    dynamicTableInstance?.reload();
  };

  function handleDictTypeChange(value) {
    typeId.value = value;
  }

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
            perm: 'system:dict-item:update',
            effect: 'disable',
          },
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
          auth: 'system:dict-item:delete',
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
