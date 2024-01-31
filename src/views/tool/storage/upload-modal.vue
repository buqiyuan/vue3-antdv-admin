<template>
  <a-button type="primary" :disabled="!$auth('upload:upload')" @click="visible = true">
    上传
  </a-button>

  <DraggableModal
    v-model:open="visible"
    title="上传"
    :width="800"
    ok-text="开始上传"
    :ok-button-props="{ disabled: disabledUpload }"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-flex justify="space-between" align="center">
      <a-alert message="单个文件不超过2MB，最多只能上传10个文件" type="info" show-icon />
      <a-upload :multiple="true" :before-upload="beforeUpload" :show-upload-list="false">
        <a-button type="primary"> 选择文件 </a-button>
      </a-upload>
    </a-flex>

    <DynamicTable :search="false" :data-source="fileList" :columns="columns" />
  </DraggableModal>
</template>

<script setup lang="tsx">
  import { ref, computed } from 'vue';
  import { message, type UploadProps } from 'ant-design-vue';
  import { UploadResultStatus, fileListColumns, type FileItem } from './columns';
  import { DraggableModal } from '@/components/core/draggable-modal';
  import { useTable, type TableColumn } from '@/components/core/dynamic-table';
  import Api from '@/api/';

  const emit = defineEmits(['uploadSuccess']);

  const [DynamicTable] = useTable();

  const visible = ref(false);
  const fileList = ref<FileItem[]>([]);

  const disabledUpload = computed(() => {
    return !fileList.value.some((n) => n.status !== UploadResultStatus.SUCCESS);
  });

  const fileToBase64 = (file: File): Promise<string> => {
    const { promise, resolve, reject } = Promise.withResolvers<string>();

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
    return promise;
  };

  const onCancel = () => {
    const hasSuccess = fileList.value.some((n) => n.status === UploadResultStatus.SUCCESS);
    if (hasSuccess) {
      emit('uploadSuccess');
    }
    fileList.value = [];
  };

  const onOk = async () => {
    const uploadFileList = fileList.value.filter((n) => n.status !== UploadResultStatus.SUCCESS);
    await Promise.all(
      uploadFileList.map(async (item) => {
        try {
          await Api.toolsUpload.uploadUpload({ file: item.file }, undefined, {
            onUploadProgress(progressEvent) {
              const complete = ((progressEvent.loaded / progressEvent.total!) * 100) | 0;
              item.percent = complete;
              item.status = UploadResultStatus.UPLOADING;
            },
          });
          item.status = UploadResultStatus.SUCCESS;
        } catch (error) {
          console.log(error);
          item.status = UploadResultStatus.ERROR;
        }
      }),
    );
  };

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (file.size / 1024 / 1024 > 2) {
      message.error('单个文件不超过2MB');
    } else {
      const item: FileItem = {
        file,
        uid: file.uid,
        name: file.name,
        size: file.size,
        status: '',
        percent: 0,
        thumbUrl: await fileToBase64(file),
      };
      fileList.value.push(item);
    }

    return false;
  };

  const handleRemove = (record: FileItem) => {
    fileList.value = fileList.value.filter((n) => n.uid !== record.uid);
  };

  const columns: TableColumn<FileItem>[] = [
    ...fileListColumns,
    {
      width: 120,
      title: '操作',
      dataIndex: 'ACTION',
      fixed: false,
      actions: ({ record }) => [
        {
          label: '删除',
          color: 'red',
          onClick: () => handleRemove(record),
        },
      ],
    },
  ];
</script>

<style scoped></style>
