<template>
  <Card class="h-full">
    <template #title>
      <Space>
        <FolderOutlined />
        <Breadcrumb>
          <Breadcrumb.Item>
            <Typography.Link @click="handleJumpPath(-1)">根目录</Typography.Link>
          </Breadcrumb.Item>
          <template v-for="(item, index) in currentPathList" :key="index">
            <Breadcrumb.Item>
              <Typography.Link @click="handleJumpPath(index)">{{ item }}</Typography.Link>
            </Breadcrumb.Item>
          </template>
        </Breadcrumb>
      </Space>
    </template>
    <template #extra>
      <FileOperateButtonList
        v-model:search-key="localSearchKey"
        :selected-file-list="selectedFileList"
        :update-operate-status="updateOperateStatus"
        :parse-path="parsePath"
        @changed="refresh"
      />
    </template>

    <DynamicTable
      :data-source="fileList"
      :columns="columns"
      :custom-row="customRow"
      :auto-height="true"
      :pagination="false"
      :search="false"
      :show-tool-bar="false"
      :loading="tableLoading"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <Typography.Link
            :disabled="record.type === 'file' && $auth('netdisk:manage:info')"
            @click="handleClickFileItem(record)"
          >
            <Space>
              <svg-icon :name="parseType(record.name, record.type)" />
              <span v-if="isSearching" v-html="hignlightSearchKey(record.name)" />
              <span v-else>{{ record.name }}</span>
            </Space>
          </Typography.Link>
        </template>
      </template>
    </DynamicTable>
    <FilePreviewDrawer ref="previewDrawerRef" />
  </Card>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import { FolderOutlined } from '@ant-design/icons-vue';
  import { isEmpty } from 'lodash-es';
  import { Card, Typography, Space, Breadcrumb } from 'ant-design-vue';
  import FileOperateButtonList from './components/file-operate-button-list.vue';
  import FilePreviewDrawer from './components/file-preview-drawer.vue';
  import { useColumns } from './columns';
  import { getRenameSchemas } from './formSchemas';
  import type { TableRowSelection } from 'ant-design-vue/es/table/interface';
  import { Api } from '@/api/';
  import { parseMimeTypeToIconName } from '@/utils';
  import { useFormModal } from '@/hooks/useModal';
  import { createContextMenu } from '@/components/basic/context-menu';
  import { useTable } from '@/components/core/dynamic-table';
  import { hasPermission } from '@/permission';

  defineOptions({
    name: 'NetDiskManage',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();
  const [showModal] = useFormModal();
  const { columns, currentPathList, localSearchKey, isSearching } = useColumns();

  const previewDrawerRef = ref<InstanceType<typeof FilePreviewDrawer>>();

  const fileList = ref<any[]>([]);
  const marker = ref<string | null>('');
  const isOperating = ref(false);
  const tableLoading = ref(false);
  const isLoading = ref(false);
  // 防止滚动加载速度过快导致出现数据不同步
  const lock = ref(false);
  const selectedFileList = ref<API.FileOpItem[]>([]);
  const rowSelection = reactive<TableRowSelection<API.SFileInfo>>({
    selectedRowKeys: [],
    onChange: (selectedRowKeys: Key[], selectedRows) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      rowSelection.selectedRowKeys = selectedRowKeys;
      selectedFileList.value = selectedRows.map((n) => ({ type: n.type, name: n.name }));
    },
  });

  const loadMoreDisabled = computed(() => isEmpty(marker.value));

  const parsePath = () => {
    let path = '';
    if (currentPathList.value.length > 0) {
      path = `${currentPathList.value.join('/')}/`;
    }
    return path;
  };

  const parseType = (fileName: string, type: API.SFileInfo['type']) => {
    if (type === 'dir') {
      return 'file-type-dir';
    }
    return parseMimeTypeToIconName(fileName);
  };

  const hignlightSearchKey = (name: string) => {
    return name.replace(
      new RegExp(`${localSearchKey.value}`, 'g'),
      `<span style='color: red;'>${localSearchKey.value}</span>`,
    );
  };
  const updateOperateStatus = (showing: boolean) => {
    if (isOperating.value !== showing) {
      isOperating.value = showing;
    }
  };

  const refresh = () => {
    marker.value = ' ';
    fileList.value = [];
    selectedFileList.value = [];
    // unlock
    if (lock.value) {
      lock.value = false;
    }
    loadData();
  };

  const loadData = async () => {
    console.log('loadData lock.value', lock.value);
    if (lock.value) {
      return;
    }
    tableLoading.value = true;
    lock.value = true;
    const path = parsePath();
    const data = await Api.netDiskManage
      .netDiskManageList({
        path,
        key: localSearchKey.value,
        marker: marker.value?.trim() || '',
      })
      .finally(() => (tableLoading.value = false));
    if (!isEmpty(marker)) {
      // 上次有分页记录时，目录可能会重复，需要去重在进行追加
      const fl = data.list.filter((f) => {
        if (f.type === 'file') {
          return true;
        } else {
          return !fileList.value.find((e) => {
            if (e.type === 'file') {
              return false;
            }
            return e.name === f.name;
          });
        }
      });
      if (!isEmpty(fl)) {
        fileList.value.push(...fl);
      }
    } else {
      // 非分页，直接赋值
      fileList.value = data.list || [];
    }
    // 记录分页加载标志
    marker.value = data.marker;
    lock.value = false;
  };

  const handleJumpPath = (index) => {
    console.log('handleJumpPath ', index);
    if (isSearching.value) {
      return;
    }
    if (index === -1 && currentPathList.value.length > 0) {
      currentPathList.value = [];
    } else if (index >= 0 && currentPathList.value.length - 1 !== index) {
      currentPathList.value = currentPathList.value.slice(0, index + 1);
    }
  };

  const handleClickFileItem = (row: API.SFileInfo) => {
    console.log('handleClickFileItem ', row);
    if (row.type === 'dir') {
      if (isSearching.value) {
        const pathList = isEmpty(row.belongTo) ? [] : row.belongTo.split('/');
        pathList.push(row.name);
        // clear search key
        localSearchKey.value = '';
        currentPathList.value = pathList;
      } else {
        currentPathList.value.push(row.name);
      }
    } else {
      if (isSearching.value) {
        previewDrawerRef.value?.open(row.name, isEmpty(row.belongTo) ? '' : `${row.belongTo}/`);
      } else {
        previewDrawerRef.value?.open(row.name, parsePath());
      }
    }
  };

  const handleDownload = async (row: API.SFileInfo) => {
    try {
      isLoading.value = true;
      const data = await Api.netDiskManage.netDiskManageDownload({
        path: parsePath(),
        name: row.name,
      });
      // handle
      window.open(`${data}?attname=${encodeURIComponent(row.name)}`);
    } finally {
      isLoading.value = false;
    }
  };

  const handleRename = async (record: API.SFileInfo) => {
    console.log('record', record);

    await showModal({
      modalProps: {
        title: '重命名',
        width: 700,
        onFinish: async (values) => {
          await Api.netDiskManage.netDiskManageRename({
            type: record.type,
            toName: values.toName,
            name: record.name,
            path: parsePath(),
          });
          refresh();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: getRenameSchemas(record),
      },
    });
  };

  const customRow = (record: API.SFileInfo) => {
    return {
      onContextmenu: (e: MouseEvent) => {
        createContextMenu({
          event: e,
          items: [
            {
              label: '下载',
              disabled: record.type === 'dir' || !hasPermission('netdisk:manage:download'),
              handler: () => {
                handleDownload(record);
              },
            },
            {
              label: '重命名',
              disabled: !hasPermission('netdisk:manage:rename'),
              handler: () => {
                handleRename(record);
              },
            },
          ],
        });
      },
    };
  };

  watch(
    [currentPathList, localSearchKey],
    () => {
      refresh();
    },
    { deep: true },
  );

  onMounted(() => {
    loadData();
    dynamicTableInstance.onInfiniteScroll(() => {
      if (!loadMoreDisabled.value) {
        loadData();
      }
    });
  });
</script>
