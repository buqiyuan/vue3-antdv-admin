<template>
  <teleport to="body">
    <div @click.self="isVisible = false" v-if="isVisible" class="preview-modal">
      <close-circle-outlined @click="isVisible = false" class="close-icon" />
      <div class="preview-content" :style="contentStyle">
        <a-spin :spinning="loading">
          <img @load.stop="imgLoaded" v-if="type === 'image'" ref="img" :style="imgStyle" :src="url"
               alt=""/>
          <video ref="video" @canplay="loading = false" @loadstart="loading = true" v-if="type === 'video'" :src="url"
                 controls autoplay></video>
          <div ref="imgScaleMask" class="img-scale-mask">
            {{ ~~(imgScale * 100) + '%' }}
          </div>
        </a-spin>
      </div>
      <div v-if="type === 'image'" class="toolbar">
        <zoom-in-outlined @click="zoomInImg" title="放大"/>
        <zoom-out-outlined @click="zoomOutImg" title="缩放"/>
        <one-to-one-outlined @click="resetImg" title="原始比例" />
        <redo-outlined @click="rotateImg" title="旋转"/>
        <download-outlined @click="saveImg(url)" title="下载"/>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, PropType, reactive, toRefs, ref, computed} from 'vue'
import {Spin} from 'ant-design-vue'
import {ZoomInOutlined, ZoomOutOutlined, RedoOutlined, DownloadOutlined,OneToOneOutlined, CloseCircleOutlined} from '@ant-design/icons-vue'
import {downloadByUrl} from "@/utils/downloadFile";

export default defineComponent({
  name: 'preview-modal',
  emits: ['update:visible'],
  components: {ZoomInOutlined, ZoomOutOutlined, RedoOutlined, DownloadOutlined, CloseCircleOutlined,OneToOneOutlined, [Spin.name]: Spin},
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    type: {
      type: String as PropType<string>,
      default: 'image',
    },
    url: {
      type: String as PropType<string>,
      default: '',
    }
  },
  setup(props, {emit}) {
    // 图片蒙层
    const imgScaleMask = ref<any>(null)

    let timer

    const state = reactive({
      timer: null,
      loading: false, // 视频加载动画
      rotateDeg: 0,
      imgScale: 1, // 图片缩放比
      scaleCV: 0.07, // 缩放的系数
      initWidth: 0, // 图片初始宽高
      initHeight: 0, // 图片初始宽高
      contentStyle: { // 默认大小
        width: '60vw',
        height: '60vh'
      } as any,
      imgStyle: {
        width: '',
        height: '',
        transform: 'rotate(0)'
      } as any
    })

    const isVisible = computed({
      get: () => props.visible,
      set: (val) => emit('update:visible', val )
    })

    // 旋转图片
    const rotateImg = () => {
      state.rotateDeg -= 90
      state.imgStyle.transform = `rotate(${state.rotateDeg}deg)`
    }
    // 保存图片
    const saveImg = (url) => {
      downloadByUrl({url})
    }
    // 处理图片缩放比
    const handZoom = (type = 'scale') => {
      console.log(state.imgScale)
      state.imgStyle.width = state.initWidth * state.imgScale + 'px'
      state.imgStyle.height = state.initHeight * state.imgScale + 'px'
      if (type === 'init') {
        state.imgStyle.maxWidth = ''
        state.imgStyle.maxHeight = ''
      } else {
        state.imgStyle.maxWidth = 'none!important'
        state.imgStyle.maxHeight = 'none!important'
      }
      clearTimeout(timer)
      timer = setTimeout(() => imgScaleMask.value.classList.remove('active'), 1400)
      imgScaleMask.value.classList.add('active')
      state.contentStyle = {}
    }
    // 恢复原来的比例
    const resetImg = () => {
      state.imgScale = 1
      handZoom()
    }
    // 图片放大
    const zoomInImg = () => {
      state.imgScale += state.scaleCV
      handZoom()
    }
    // 图片缩放
    const zoomOutImg = () => {
      state.imgScale -= state.scaleCV
      handZoom()
    }

    // 图片加载完成后获取初始宽高
    const imgLoaded = (e) => {
      if (e.currentTarget?.complete) {
        const {width, height} = getComputedStyle(e.currentTarget)
        state.imgStyle.width = width
        state.imgStyle.height = height
        state.initWidth = parseFloat(width)
        state.initHeight = parseFloat(height)
        console.log(state.imgStyle, '图片加载完毕')
      }
    }

    return {
      ...toRefs(state),
      imgScaleMask,
      isVisible,
      rotateImg,
      saveImg,
      zoomInImg,
      zoomOutImg,
      handZoom,
      imgLoaded,
      resetImg
    }
  }
})
</script>

<style lang="scss">
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  .close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
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
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .05);

  img, video {
    max-width: 100%;
    max-height: 100%;
    outline: none;
  }

  video {

  }

  .img-scale-mask {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.08s;
    color: white;
    padding: 8px 22px;
    text-align: center;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, .6);
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
  transform: translateX(-50%);
  font-size: 26px;
  background-color: white;
  padding: 4px 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  background-color: rgba(109,109,109,.6);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .08);

  > .anticon  {
    padding: 3px 8px;
    cursor: pointer;
    color: white;

    &:hover {
      transform: scale(1.06);
    }
  }
}
</style>
