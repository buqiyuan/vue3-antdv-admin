<template>
  <Drawer title="文件详情" :width="500" :open="visible" @close="handleClose">
    <Spin :spinning="loading" class="preview-drawer-inner-box">
      <Space direction="vertical">
        <Image
          :style="{
            width: disabledPreview ? '130px' : '100%',
            height: disabledPreview ? '85px' : '210px',
          }"
          :src="disabledPreview ? noPreviewImage : imageView2Handle"
          :preview="
            disabledPreview
              ? false
              : {
                  src: previewSrc,
                }
          "
        />
        <Descriptions bordered :column="1">
          <template v-for="key in detailInfoMap.keys()" :key="key">
            <Descriptions.Item :label="detailInfoMap.get(key)">
              {{ detailInfo[key] }}
            </Descriptions.Item>
          </template>
          <!-- mark -->
          <Descriptions.Item label="文件备注">
            <Space direction="vertical" align="end">
              <Input.TextArea
                v-model:value="mark"
                :disabled="!$auth('netdisk.manage.mark')"
                placeholder="请输入文件备注"
                :maxlength="100"
                :rows="4"
                show-count
              />
              <a-button
                :loading="updateMarkLoading"
                :disabled="!$auth('netdisk.manage.mark')"
                type="primary"
                size="small"
                @click="updateMark"
                >更新</a-button
              >
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Spin>
  </Drawer>
</template>

<script lang="ts" setup>
  import { ref, computed, nextTick } from 'vue';
  import { isEmpty } from 'lodash-es';
  import { Drawer, message, Spin, Image, Input, Descriptions, Space } from 'ant-design-vue';
  import { formatSizeUnits } from '@/utils';
  import noPreviewImage from '@/assets/images/no-preview.png';
  import * as netdiskManage from '@/api/netdisk';
  import { verifyAuth } from '@/core/permission';

  type DetailInfo = MergePropertyTypes<
    API.FileInfo,
    {
      name: string;
      fsize: string;
    }
  >;

  defineOptions({
    name: 'FilePreviewDrawer',
  });

  const detailInfoMap = new Map([
    ['name', '文件名'],
    ['mimeType', '文件类型'],
    ['hash', '文件Hash'],
    ['md5', '文件MD5'],
    ['fsize', '文件大小'],
    ['putTime', '上传时间'],
    ['uploader', '上传人员'],
  ] as const);

  const loading = ref(false);
  const visible = ref(false);
  const fileName = ref('');
  const filePath = ref('');

  const detailInfo = ref<Partial<DetailInfo>>({});
  const previewSrc = ref('');
  const mark = ref('');
  const updateMarkLoading = ref(false);

  const disabledPreview = computed(() => {
    return isEmpty(previewSrc.value);
  });
  // 使用七牛图片处理，减少预览耗费流量
  const imageView2Handle = computed(() => {
    return `${previewSrc.value}?imageView2/2/w/500/h/210`;
  });

  const open = (name, path) => {
    visible.value = true;
    fileName.value = name;
    filePath.value = path;
    nextTick(async () => {
      try {
        loading.value = true;
        const fileInfo = {
          name,
          path,
        };
        const data = await netdiskManage.fileInfo(fileInfo);
        mark.value = data.mark;
        Array.from(detailInfoMap.keys()).forEach((key) => {
          if (key === 'fsize') {
            detailInfo.value.fsize = formatSizeUnits(data[key]);
          } else {
            detailInfo.value[key] = data[key];
          }
        });
        detailInfo.value.name = name;
        console.log('detailInfo', detailInfo.value);
        if (verifyAuth('netdisk.manage.download') && data.mimeType.includes('image/')) {
          // 可预览
          const url = await netdiskManage.downloadFile(fileInfo);
          previewSrc.value = url;
        }
      } catch {
        handleClose();
      } finally {
        loading.value = false;
      }
    });
  };
  const updateMark = async () => {
    try {
      updateMarkLoading.value = true;
      await netdiskManage.fileMark({
        name: fileName.value,
        path: filePath.value,
        mark: mark.value,
      });
      message.success('已更新文件备注');
    } finally {
      updateMarkLoading.value = false;
    }
  };
  const handleClose = () => {
    fileName.value = '';
    filePath.value = '';
    previewSrc.value = '';
    mark.value = '';
    detailInfo.value = {};
    visible.value = false;
  };

  defineExpose({ open });
</script>
