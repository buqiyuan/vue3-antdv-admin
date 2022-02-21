<template>
  <div class="split-wrapper">
    <div ref="scalable" class="scalable">
      <div class="left-content">
        <slot name="left-content"> 右边内容区 </slot>
      </div>
      <div ref="separator" class="separator" @mousedown="startDrag"><i></i><i></i></div>
    </div>
    <div class="right-content">
      <slot name="right-content"> 右边内容区 </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { throttle } from 'lodash-es';

  const scalable = ref<HTMLDivElement>();

  let startX: number;
  let startWidth: number;

  // 拖拽中
  // @throttle(20)
  const onDrag = throttle(function (e: MouseEvent) {
    scalable.value && (scalable.value.style.width = startWidth + e.clientX - startX + 'px');
  }, 20);

  // 拖拽结束
  const dragEnd = () => {
    document.documentElement.style.userSelect = 'unset';
    document.documentElement.removeEventListener('mousemove', onDrag);
    document.documentElement.removeEventListener('mouseup', dragEnd);
  };

  // 鼠标按下
  const startDrag = (e: MouseEvent) => {
    startX = e.clientX;
    scalable.value && (startWidth = parseInt(window.getComputedStyle(scalable.value).width, 10));

    document.documentElement.style.userSelect = 'none';
    document.documentElement.addEventListener('mousemove', onDrag);
    document.documentElement.addEventListener('mouseup', dragEnd);
  };
</script>

<style lang="less">
  .split-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: white;

    .scalable {
      position: relative;
      width: 240px;
      max-width: 50vw;
      min-width: 100px;
      overflow: auto;

      .left-content {
        height: 100%;
        padding: 12px 20px 12px 12px;
      }

      .separator {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        width: 14px;
        height: 100%;
        cursor: col-resize;
        background-color: white;
        box-shadow: -4px -2px 4px -5px rgba(0, 0, 0, 0.35), 4px 3px 4px -5px rgba(0, 0, 0, 0.35);
        align-items: center;
        justify-content: center;

        i {
          width: 1px;
          height: 14px;
          margin: 0 1px;
          background-color: #e9e9e9;
        }
      }
    }

    .right-content {
      flex: 1;
    }

    .left-content,
    .right-content {
      overflow: auto;
    }
  }
</style>
