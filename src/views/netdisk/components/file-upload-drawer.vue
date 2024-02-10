<template>
  <div class="file-upload-drawer-container">
    <Drawer
      :title="title"
      :width="400"
      :visible="visible"
      :mask-closable="false"
      @close="handleClose"
    >
      <Spin :spinning="loading" class="upload-inner-box">
        <Upload.Dragger
          ref="uploadRef"
          v-model:file-list="fileList"
          class="upload"
          drag
          action="noaction"
          :multiple="true"
          :custom-request="uploadFile"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </Upload.Dragger>
      </Spin>
    </Drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, createVNode, nextTick } from 'vue';
  import { isEmpty } from 'lodash-es';
  import * as qiniu from 'qiniu-js/esm';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal, Drawer, Spin, Upload, notification } from 'ant-design-vue';
  import type { UploadProps, UploadFile } from 'ant-design-vue';
  import { Api } from '@/api/';

  defineOptions({
    name: 'FileUploadDrawer',
  });

  const emit = defineEmits(['changed']);

  const uploadRef = ref<InstanceType<typeof Upload.Dragger>>();
  const loading = ref(false);
  const visible = ref(false);
  const path = ref('');
  const token = ref('');
  const subscribes = ref<any[]>([]);
  // 成功的请求
  const successSubs = ref<any[]>([]);
  const fileList = ref<UploadFile<any>[]>([]);

  const title = computed(() => {
    return `上传文件到${
      isEmpty(path.value) ? '根' : path.value.substring(0, path.value.length - 1)
    }目录`;
  });

  const open = (filePath: string) => {
    path.value = filePath;
    // showing dialog
    visible.value = true;

    loading.value = true;
    // get qiniu upload token
    Api.netDiskManage
      .netDiskManageToken()
      .then((data) => {
        token.value = data.token;
        // hide loading
        loading.value = false;
      })
      .catch(() => {
        // close
        visible.value = false;
      });
  };
  const handleClose = () => {
    if (subscribes.value.length > 0 && subscribes.value.length !== successSubs.value.length) {
      Modal.confirm({
        title: '关闭会取消未上传的文件，确认关闭吗？',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: close,
      });
    } else {
      close();
    }
  };
  const close = () => {
    // hidden
    visible.value = false;
    loading.value = false;
    path.value = '';
    token.value = '';
    fileList.value = [];
    clear();
  };
  /**
   * 使用qiniu-js上传
   */
  const uploadFile: UploadProps['customRequest'] = (param) => {
    // onProgress, onError, onSuccess
    const { file, onProgress, onError, onSuccess } = param;
    const observable = qiniu.upload(
      file as File,
      `${path.value}${(file as File).name}`,
      token.value,
    );
    const sub = observable.subscribe({
      next: (res) => {
        // https://github.com/ElemeFE/element/issues/9759
        onProgress?.({ percent: res.total.percent });
      },
      error: (err) => {
        onError?.(err);
        handleUploadError(err, file as File);
        console.log('上传失败', err);
      },
      complete: (res) => {
        successSubs.value.push(sub);
        onSuccess?.(res);
        handleUploadSuccess(file as File);
      },
    });
    subscribes.value.push(sub);
  };
  const handleUploadError = (err, file: File) => {
    const failFile = fileList.value.find((n) => n.originFileObj === file);
    if (failFile) {
      failFile.status = 'error';
    }
    notification.error({
      message: '上传进度提醒',
      description: `上传${file?.name}文件失败！错误信息：${
        err.code === 614 ? '上传文件已存在' : err.message
      }`,
      duration: 0,
    });
  };
  const handleUploadSuccess = (file: File) => {
    const successFile = fileList.value.find((n) => n.originFileObj === file);
    if (successFile) {
      successFile.status = 'success';
    }
    notification.success({
      message: `上传${successFile?.name}成功`,
    });
  };
  const clear = async () => {
    if (subscribes.value.length <= 0) {
      return;
    }
    const subsTmpArr = subscribes.value;
    const successSubsTmpArr = successSubs.value;
    // clean
    subscribes.value = [];
    successSubs.value = [];
    // un sub
    if (subsTmpArr.length !== successSubsTmpArr.length) {
      for (let i = 0; i < subsTmpArr.length; i++) {
        subsTmpArr[i].unsubscribe();
        subsTmpArr[i] = null;
      }
    }
    // uploadRef.value.clearFiles();
    await nextTick();
    // emit
    emit('changed');
  };

  defineExpose({
    open,
  });
</script>

<style lang="less"></style>
