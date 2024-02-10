<template>
  <Space>
    <a-button v-if="copyMode || cutMode" :disabled="disabledPasteButton" @click="handlePaste">
      <DeliveredProcedureOutlined />粘贴
    </a-button>
    <Dropdown size="small">
      <Tooltip title="注意：复制或剪切时会覆盖重名文件" placement="top">
        <a-button color="#e6a23c" :disabled="disabledMultiOperateButton">
          <template #icon><MenuOutlined /></template>
          批量操作
        </a-button>
      </Tooltip>
      <template #overlay>
        <Menu @click="handleMoreOpCommand">
          <Menu.Item key="copy" :disabled="!$auth('netdisk:manage:copy')">
            <CopyOutlined /> 复制所选
          </Menu.Item>
          <Menu.Item key="cut" :disabled="!$auth('netdisk:manage:cut')">
            <ScissorOutlined :rotate="-90" /> 剪切所选
          </Menu.Item>
          <Menu.Item key="delete" :disabled="!$auth('netdisk:manage:delete')">
            <DeleteOutlined /> 删除所选
          </Menu.Item>
          <Menu.Item key="cancel" divider :disabled="!copyMode && !cutMode">
            <CloseOutlined /> 取消粘贴
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
    <a-button type="success" :disabled="!$auth('netdisk:manage:list')" @click="handleSearch">
      <template #icon><SearchOutlined /></template>
      {{ isSearching ? '取消搜索' : '全盘搜索' }}
    </a-button>
    <a-button type="primary" :disabled="!$auth('netdisk:manage:token')" @click="handleUpload">
      <template #icon><CloudUploadOutlined /></template>
      上传文件
    </a-button>
    <a-button @click="handleMkdir">
      <template #icon><FolderAddOutlined /></template>
      创建文件夹
    </a-button>
  </Space>
  <FileUploadDrawer ref="uploadDrawerRef" @changed="$emit('changed')" />
</template>

<script lang="ts" setup>
  import { ref, computed, watch, createVNode } from 'vue';
  import {
    FolderAddOutlined,
    CloudUploadOutlined,
    SearchOutlined,
    MenuOutlined,
    ExclamationCircleOutlined,
    CopyOutlined,
    ScissorOutlined,
    DeleteOutlined,
    CloseOutlined,
    DeliveredProcedureOutlined,
  } from '@ant-design/icons-vue';
  import { clone, isEmpty } from 'lodash-es';
  import { message, Modal, Space, Dropdown, Menu, Tooltip } from 'ant-design-vue';
  import FileUploadDrawer from './file-upload-drawer.vue';
  import type { PropType } from 'vue';
  import { Api } from '@/api/';
  import { useFormModal } from '@/hooks/useModal';
  import { mkdirSchemas, searchSchemas } from '@/views/netdisk/formSchemas';

  defineOptions({
    name: 'FileOperateButtonList',
  });

  const props = defineProps({
    selectedFileList: {
      type: Array as PropType<API.FileOpItem[]>,
      required: true,
    },
    parsePath: {
      type: Function,
      required: true,
    },
    searchKey: {
      type: String,
      required: true,
    },
    updateOperateStatus: {
      type: Function,
      required: true,
    },
  });

  const emit = defineEmits(['changed', 'update:searchKey']);

  const [showModal] = useFormModal();

  const uploadDrawerRef = ref<InstanceType<typeof FileUploadDrawer>>();
  // cur & copy 两者对立，不能存在两个都为true
  const cutMode = ref(false);
  const copyMode = ref(false);
  const pasteOriginPath = ref('');
  const pasteFileList = ref<any>([]);

  const disabledMultiOperateButton = computed(() => {
    if (pasteFileList.value.length > 0) {
      // need paste
      return false;
    }
    return props.selectedFileList.length <= 0;
  });
  const disabledPasteButton = computed(() => {
    return cutMode.value && pasteOriginPath.value === props.parsePath();
  });
  const isSearching = computed(() => {
    return !isEmpty(props.searchKey);
  });

  watch(cutMode, (mode) => {
    if (mode) {
      copyMode.value && (copyMode.value = false);
      recordFileList();
    }
  });

  watch(copyMode, (mode) => {
    if (mode) {
      cutMode.value && (cutMode.value = false);
      recordFileList();
    }
  });

  const handleMoreOpCommand = ({ key: command }) => {
    console.log('command', command);
    if (command === 'copy') {
      copyMode.value = true;
    } else if (command === 'cut') {
      cutMode.value = true;
    } else if (command === 'delete') {
      // delete
      Modal.confirm({
        title: '你确定要删除吗?',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: handleDelete,
      });
    } else if (command === 'cancel') {
      cutMode.value = false;
      copyMode.value = false;
      clearPasteCache();
    }
  };
  const recordFileList = () => {
    pasteFileList.value = clone(props.selectedFileList);
    pasteOriginPath.value = props.parsePath();
  };
  const clearPasteCache = () => {
    pasteOriginPath.value = '';
    pasteFileList.value = [];
  };
  const handlePaste = async () => {
    try {
      props.updateOperateStatus(true);
      const opData = {
        files: pasteFileList.value,
        originPath: pasteOriginPath.value,
        toPath: props.parsePath(),
      };
      let notifyMsg;
      if (cutMode.value && !copyMode.value) {
        // cut
        await Api.netDiskManage.netDiskManageCut(opData);
        notifyMsg = '剪切';
        cutMode.value = false;
      } else if (!cutMode.value && copyMode.value) {
        // copy
        await Api.netDiskManage.netDiskManageCopy(opData);
        notifyMsg = '复制';
        copyMode.value = false;
      } else {
        throw new Error('unsupport operate');
      }
      clearPasteCache();
      message.success(`${notifyMsg}成功`);
      emit('changed');
    } finally {
      props.updateOperateStatus(false);
    }
  };

  const handleDelete = async () => {
    const path = props.parsePath();
    const files = clone(props.selectedFileList);
    await Api.netDiskManage.netDiskManageDelete(
      {
        path,
        files,
      },
      { showSuccessMsg: false },
    );
    message.success('已删除指定列表');
    emit('changed');
  };

  const handleSearch = async () => {
    if (isSearching.value) {
      emit('update:searchKey', '');
      return;
    }
    await showModal({
      modalProps: {
        title: '全盘搜索',
        width: 700,
        onFinish: async (values) => {
          emit('update:searchKey', values.key);
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: searchSchemas,
      },
    });
  };

  const handleUpload = () => {
    uploadDrawerRef.value?.open(props.parsePath());
  };

  const handleMkdir = async () => {
    await showModal({
      modalProps: {
        title: '创建文件夹',
        width: 700,
        onFinish: async (values) => {
          await Api.netDiskManage.netDiskManageMkdir({
            path: props.parsePath(),
            dirName: values.dirName,
          });
          emit('changed');
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: mkdirSchemas,
      },
    });
  };
</script>
