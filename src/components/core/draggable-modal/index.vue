<template>
  <teleport :to="getContainer()">
    <div ref="modalWrapRef" class="custom-modal" :class="{ fullscreen: fullscreenModel }">
      <Modal
        v-bind="{ ...$attrs, ...props }"
        v-model:visible="visibleModel"
        :maskClosable="false"
        :getContainer="() => modalWrapRef"
        :width="innerWidth || width"
        @ok="emit('ok')"
        @cancel="emit('cancel')"
      >
        <template #title>
          <slot name="title">{{ $attrs.title || '标题' }}</slot>
        </template>
        <template #closeIcon>
          <slot name="closeIcon">
            <Space @click.stop class="ant-modal-operate">
              <fullscreen-outlined @click="fullscreenModel = true" v-if="!fullscreenModel" />
              <fullscreen-exit-outlined @click="restore" v-else />
              <close-outlined @click="closeModal" />
            </Space>
          </slot>
        </template>
        <slot>
          ① 窗口可以拖动；<br />
          ② 窗口可以通过八个方向改变大小；<br />
          ③ 窗口可以最小化、最大化、还原、关闭；<br />
          ④ 限制窗口最小宽度/高度。
        </slot>
        <template v-if="$slots.footer" #footer>
          <slot name="footer"></slot>
        </template>
      </Modal>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue';
  import { Modal, Space } from 'ant-design-vue';
  import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
  import { useVModel } from '@vueuse/core';
  import { throttle } from 'lodash-es';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: 520,
    },
    getContainer: {
      type: Function,
      default: () => document.body,
    },
    destroyOnClose: Boolean,
  });

  const emit = defineEmits(['update:visible', 'update:fullscreen', 'ok', 'cancel']);

  const visibleModel = useVModel(props, 'visible');
  const fullscreenModel = ref(props.fullscreen);
  const innerWidth = ref('');

  const cursorStyle = {
    top: 'n-resize',
    left: 'w-resize',
    right: 'e-resize',
    bottom: 's-resize',
    topLeft: 'nw-resize',
    topright: 'ne-resize',
    bottomLeft: 'sw-resize',
    bottomRight: 'se-resize',
    auto: 'auto',
  } as const;

  // 是否已经初始化过了
  let inited = false;
  const modalWrapRef = ref<HTMLDivElement>();

  const closeModal = () => {
    visibleModel.value = false;
    emit('cancel');
  };

  // 居中弹窗
  const centerModal = async () => {
    await nextTick();
    const modalEl = modalWrapRef.value?.querySelector<HTMLDivElement>('.ant-modal');

    if (modalEl && modalEl.getBoundingClientRect().left < 1) {
      modalEl.style.left = (document.documentElement.clientWidth - modalEl.offsetWidth) / 2 + 'px';
    }
  };

  const restore = async () => {
    fullscreenModel.value = false;
    centerModal();
  };

  const registerDragTitle = (dragEl: HTMLDivElement, handleEl: HTMLDivElement) => {
    handleEl.style.cursor = 'move';
    handleEl.onmousedown = throttle((e: MouseEvent) => {
      if (fullscreenModel.value) return;
      document.body.style.userSelect = 'none';
      const disX = e.clientX - dragEl.getBoundingClientRect().left;
      const disY = e.clientY - dragEl.getBoundingClientRect().top;
      const mousemove = (event: MouseEvent) => {
        if (fullscreenModel.value) return;
        let iL = event.clientX - disX;
        let iT = event.clientY - disY;
        const maxL = document.documentElement.clientWidth - dragEl.offsetWidth;
        const maxT = document.documentElement.clientHeight - dragEl.offsetHeight;

        iL <= 0 && (iL = 0);
        iT <= 0 && (iT = 0);
        iL >= maxL && (iL = maxL);
        iT >= maxT && (iT = maxT);

        dragEl.style.left = iL + 'px';
        dragEl.style.top = iT + 'px';
      };
      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        document.body.style.userSelect = 'auto';
      };

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    }, 20);
  };

  const initDrag = async () => {
    await nextTick();
    const modalWrapRefEl = modalWrapRef.value!;
    const modalWrapEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal-wrap');
    const modalEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal');
    if (modalWrapEl && modalEl) {
      centerModal();
      const headerEl = modalEl.querySelector<HTMLDivElement>('.ant-modal-header');
      headerEl && registerDragTitle(modalEl, headerEl);

      modalWrapEl.onmousemove = throttle((event: MouseEvent) => {
        if (fullscreenModel.value) return;
        const left = event.clientX - modalEl.offsetLeft;
        const top = event.clientY - modalEl.offsetTop;
        const right = event.clientX - modalEl.offsetWidth - modalEl.offsetLeft;
        const bottom = event.clientY - modalEl.offsetHeight - modalEl.offsetTop;
        const isLeft = left <= 0 && left > -8;
        const isTop = top < 5 && top > -8;
        const isRight = right >= 0 && right < 8;
        const isBottom = bottom > -5 && bottom < 8;
        // 向左
        if (isLeft && top > 5 && bottom < -5) {
          modalWrapEl.style.cursor = cursorStyle.left;
          // 向上
        } else if (isTop && left > 5 && right < -5) {
          modalWrapEl.style.cursor = cursorStyle.top;
          // 向右
        } else if (isRight && top > 5 && bottom < -5) {
          modalWrapEl.style.cursor = cursorStyle.right;
          // 向下
        } else if (isBottom && left > 5 && right < -5) {
          modalWrapEl.style.cursor = cursorStyle.bottom;
          // 左上角
        } else if (left > -8 && left <= 5 && top <= 5 && top > -8) {
          modalWrapEl.style.cursor = cursorStyle.topLeft;
          // 左下角
        } else if (left > -8 && left <= 5 && bottom <= 5 && bottom > -8) {
          modalWrapEl.style.cursor = cursorStyle.bottomLeft;
          // 右上角
        } else if (right < 8 && right >= -5 && top <= 5 && top > -8) {
          modalWrapEl.style.cursor = cursorStyle.topright;
          // 右下角
        } else if (right < 8 && right >= -5 && bottom <= 5 && bottom > -8) {
          modalWrapEl.style.cursor = cursorStyle.bottomRight;
        } else {
          modalWrapEl.style.cursor = cursorStyle.auto;
        }
      }, 20);
      modalWrapEl.onmousedown = (e: MouseEvent) => {
        if (fullscreenModel.value) return;
        const iParentTop = modalEl.getBoundingClientRect().top;
        const iParentLeft = modalEl.getBoundingClientRect().left;
        const disX = e.clientX - iParentLeft;
        const disY = e.clientY - iParentTop;
        const iParentWidth = modalEl.offsetWidth;
        const iParentHeight = modalEl.offsetHeight;

        const cursor = modalWrapEl.style.cursor;

        const mousemove = throttle((event: MouseEvent) => {
          if (fullscreenModel.value) return;
          if (cursor !== cursorStyle.auto) {
            document.body.style.userSelect = 'none';
          }
          // 向左边拖拽
          if (cursor === cursorStyle.left) {
            modalEl.style.left = event.clientX - disX + 'px';
            modalEl.style.width = iParentWidth + iParentLeft - event.clientX + 'px';
            // 向上边拖拽
          } else if (cursor === cursorStyle.top) {
            modalEl.style.top = event.clientY - disY + 'px';
            modalEl.style.height = iParentHeight + iParentTop - event.clientY + 'px';
            // 向右边拖拽
          } else if (cursor === cursorStyle.right) {
            modalEl.style.width = event.clientX - iParentLeft + 'px';
            // 向下拖拽
          } else if (cursor === cursorStyle.bottom) {
            modalEl.style.height = event.clientY - iParentTop + 'px';
            // 左上角拖拽
          } else if (cursor === cursorStyle.topLeft) {
            modalEl.style.left = event.clientX - disX + 'px';
            modalEl.style.top = event.clientY - disY + 'px';
            modalEl.style.height = iParentHeight + iParentTop - event.clientY + 'px';
            modalEl.style.width = iParentWidth + iParentLeft - event.clientX + 'px';
            // 右上角拖拽
          } else if (cursor === cursorStyle.topright) {
            modalEl.style.top = event.clientY - disY + 'px';
            modalEl.style.width = event.clientX - iParentLeft + 'px';
            modalEl.style.height = iParentHeight + iParentTop - event.clientY + 'px';
            // 左下角拖拽
          } else if (cursor === cursorStyle.bottomLeft) {
            modalEl.style.left = event.clientX - disX + 'px';
            modalEl.style.width = iParentWidth + iParentLeft - event.clientX + 'px';
            modalEl.style.height = event.clientY - iParentTop + 'px';
            // 右下角拖拽
          } else if (cursor === cursorStyle.bottomRight) {
            modalEl.style.width = event.clientX - iParentLeft + 'px';
            modalEl.style.height = event.clientY - iParentTop + 'px';
          }
          innerWidth.value = modalEl.style.width;
        }, 20);

        const mouseup = () => {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          document.body.style.userSelect = 'auto';
          modalWrapEl.style.cursor = cursorStyle.auto;
        };

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
      };
    }
    inited = true;
  };

  watch(visibleModel, async (val) => {
    if ((val && Object.is(inited, false)) || props.destroyOnClose) {
      initDrag();
    }
  });
</script>

<style lang="less">
  .custom-modal {
    &.fullscreen {
      .ant-modal {
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
      .ant-modal-content {
        width: 100% !important;
        height: 100% !important;
      }
    }
    .ant-modal {
      position: fixed;
      padding: 0;
      min-height: 200px;
      min-width: 200px;
      .ant-modal-close {
        top: 6px;
        right: 6px;
        &:hover,
        &:focus {
          color: rgba(0, 0, 0, 0.45);
        }
        .ant-space-item:hover .anticon,
        .ant-space-item:focus .anticon {
          color: rgba(0, 0, 0, 0.75);
          text-decoration: none;
        }
        .ant-modal-close-x {
          width: 50px;
          height: 50px;
          line-height: 44px;
          .ant-space {
            width: 100%;
            height: 100%;
          }
        }
      }
      .ant-modal-content {
        // width: ~'v-bind("props.width")px';
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 200px;
        min-width: 200px;
        overflow: hidden;
        .ant-modal-body {
          flex: auto;
          overflow: auto;
          height: 100%;
        }
        .ant-modal-footer {
        }
      }
    }
  }
</style>
