<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { message, Upload } from 'ant-design-vue';
  import { getAvatarUrl } from './columns';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  import Api from '@/api';

  defineOptions({
    name: 'AvatarUpload',
    inheritAttrs: false,
  });

  type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

  const modelValue = defineModel<string>('value');

  const fileList = ref<UploadFile[]>([]);
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');

  const avatarUrl = computed(() => {
    return getAvatarUrl(modelValue.value!);
  });

  const stop = watch(modelValue, (avatar) => {
    if (avatar && !fileList.value.length) {
      fileList.value = [
        {
          uid: `vc-upload-${Date.now()}-1`,
          name: avatar.split('/').at(-1)!,
          status: 'done',
          url: avatarUrl.value,
        },
      ];
      stop();
    }
  });

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const uploadAvatar = async (file: FileType) => {
    const { filename } = await Api.toolsUpload.uploadUpload({ file });
    modelValue.value = filename;
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    await uploadAvatar(options.file as FileType);
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    console.log('onChange', file);
    file.status = 'done';
    fileList.value = [file];
  };

  const handleRemove: UploadProps['onRemove'] = (file) => {
    console.log('handleRemove', file);
    modelValue.value = '';
    fileList.value = [];
  };

  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = avatarUrl.value;
    }
    previewImage.value = file.url || (file.preview as string);
    previewVisible.value = true;
    previewTitle.value = file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1);
  };
</script>

<template>
  <Upload
    :file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="min-h-[110px]"
    :custom-request="customRequest"
    @before-upload="beforeUpload"
    @change="handleChange"
    @remove="handleRemove"
    @preview="handlePreview"
  >
    <div v-if="fileList.length < 1">
      <PlusOutlined />
      <div style="margin-top: 8px">Upload</div>
    </div>
  </Upload>
  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<style lang="less" scoped></style>
