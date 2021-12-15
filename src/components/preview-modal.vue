<template>
  <teleport to="body">
    <div v-if="isVisible" class="preview-modal" @click.self="isVisible = false">
      <close-circle-outlined class="close-icon" @click="isVisible = false" />
      <div class="preview-content" :style="state.contentStyle">
        <Spin :spinning="state.loading">
          <img
            v-if="type === 'image'"
            ref="img"
            :style="state.imgStyle"
            :src="url"
            alt=""
            @load.stop="imgLoaded"
          />
          <video
            v-if="type === 'video'"
            ref="video"
            :src="url"
            controls
            autoplay
            @canplay="state.loading = false"
            @loadstart="state.loading = true"
          ></video>
          <div ref="imgScaleMask" class="img-scale-mask">
            {{ ~~(state.imgScale * 100) + '%' }}
          </div>
        </Spin>
      </div>
      <div v-if="type === 'image'" class="toolbar">
        <zoom-in-outlined title="放大" @click="zoomInImg" />
        <zoom-out-outlined title="缩放" @click="zoomOutImg" />
        <one-to-one-outlined title="原始比例" @click="resetImg" />
        <redo-outlined title="旋转" @click="rotateImg" />
        <download-outlined title="下载" @click="saveImg(url)" />
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import { Spin } from 'ant-design-vue';
  import {
    ZoomInOutlined,
    ZoomOutOutlined,
    RedoOutlined,
    DownloadOutlined,
    OneToOneOutlined,
    CloseCircleOutlined,
  } from '@ant-design/icons-vue';
  import { downloadByUrl } from '@/utils/downloadFile';

  interface Props {
    visible: boolean;
    type: string;
    url: string;
  }

  interface Emits {
    (e: 'update:visible', val: boolean): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
    type: 'image',
    url: '',
  });

  const emit = defineEmits<Emits>();

  // 图片蒙层
  const imgScaleMask = ref<HTMLDivElement>();

  let timer;

  const state = reactive({
    timer: null,
    loading: false, // 视频加载动画
    rotateDeg: 0,
    imgScale: 1, // 图片缩放比
    scaleCV: 0.07, // 缩放的系数
    initWidth: 0, // 图片初始宽高
    initHeight: 0, // 图片初始宽高
    contentStyle: {
      // 默认大小
      width: '60vw',
      height: '60vh',
    } as any,
    imgStyle: {
      width: '',
      height: '',
      transform: 'rotate(0)',
    } as any,
  });

  const isVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
  });

  // 旋转图片
  const rotateImg = () => {
    state.rotateDeg -= 90;
    state.imgStyle.transform = `rotate(${state.rotateDeg}deg)`;
  };
  // 保存图片
  const saveImg = (url) => {
    downloadByUrl({ url });
  };
  // 处理图片缩放比
  const handZoom = (type = 'scale') => {
    console.log(state.imgScale);
    state.imgStyle.width = state.initWidth * state.imgScale + 'px';
    state.imgStyle.height = state.initHeight * state.imgScale + 'px';
    if (type === 'init') {
      state.imgStyle.maxWidth = '';
      state.imgStyle.maxHeight = '';
    } else {
      state.imgStyle.maxWidth = 'none!important';
      state.imgStyle.maxHeight = 'none!important';
    }
    clearTimeout(timer);
    timer = setTimeout(() => imgScaleMask.value?.classList.remove('active'), 1400);
    imgScaleMask.value?.classList.add('active');
    state.contentStyle = {};
  };
  // 恢复原来的比例
  const resetImg = () => {
    state.imgScale = 1;
    handZoom();
  };
  // 图片放大
  const zoomInImg = () => {
    state.imgScale += state.scaleCV;
    handZoom();
  };
  // 图片缩放
  const zoomOutImg = () => {
    state.imgScale -= state.scaleCV;
    handZoom();
  };

  // 图片加载完成后获取初始宽高
  const imgLoaded = (e) => {
    if (e.currentTarget?.complete) {
      const { width, height } = getComputedStyle(e.currentTarget);
      state.imgStyle.width = width;
      state.imgStyle.height = height;
      state.initWidth = parseFloat(width);
      state.initHeight = parseFloat(height);
      console.log(state.imgStyle, '图片加载完毕');
    }
  };
</script>

<style lang="less">
  .preview-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    user-select: none;
    align-items: center;
    justify-content: center;

    .close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2000;
      font-size: 32px;
      color: white;
    }
  }

  .preview-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);

    img,
    video {
      max-width: 100%;
      max-height: 100%;
      outline: none;
    }

    .img-scale-mask {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 8px 22px;
      color: white;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 12px;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.08s;
      user-select: none;

      &.active {
        opacity: 1;
      }
    }
  }

  .toolbar {
    position: absolute;
    bottom: 10%;
    left: 50%;
    display: flex;
    padding: 4px 30px;
    font-size: 26px;
    background-color: white;
    background-color: rgba(109, 109, 109, 0.6);
    border-radius: 30px;
    transform: translateX(-50%);
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.08);
    align-items: center;

    > .anticon {
      padding: 3px 8px;
      color: white;
      cursor: pointer;

      &:hover {
        transform: scale(1.06);
      }
    }
  }
</style>
