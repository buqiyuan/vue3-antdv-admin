<template>
  <div class="split-wrapper">
    <div ref="scalable" class="scalable">
      <div class="left-content">
        <slot name="left-content">
          右边内容区
        </slot>
      </div>
      <div ref="separator" @mousedown="startDrag" class="separator">
        <i></i><i></i>
      </div>
    </div>
    <div class="right-content">
      <slot name="right-content">
        右边内容区
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

import { throttle } from 'lodash'

type RefElement = Nullable<HTMLElement>

export default defineComponent({
  name: "split-panel",
  setup() {
    const scalable = ref<RefElement>(null)

    let startX: number
    let startWidth: number

    // 拖拽中
    // @throttle(20)
    const onDrag = throttle(function (e: MouseEvent) {
      scalable.value && (scalable.value.style.width = startWidth + e.clientX - startX + 'px')
    }, 20)

    // 拖拽结束
    const dragEnd = () => {
      document.documentElement.style.userSelect = 'unset'
      document.documentElement.removeEventListener('mousemove', onDrag)
      document.documentElement.removeEventListener('mouseup', dragEnd)
    }

    // 鼠标按下
    const startDrag = (e: MouseEvent) => {
      startX = e.clientX
      scalable.value && (startWidth = parseInt(window.getComputedStyle(scalable.value).width, 10))

      document.documentElement.style.userSelect = 'none'
      document.documentElement.addEventListener('mousemove', onDrag)
      document.documentElement.addEventListener('mouseup', dragEnd)
    }

    return {
      startDrag,
      scalable
    }
  }
})
</script>

<style lang="scss" scoped>
.split-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: white;

  .scalable {
    overflow: auto;
    position: relative;
    min-width: 100px;
    width: 240px;
    max-width: 50vw;
    .left-content {
      height: 100%;
      padding: 20px;
    }
    .separator {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 14px;
      box-shadow: -4px -2px 4px -5px rgba(0, 0, 0, 0.35), 4px 3px 4px -5px rgba(0, 0, 0, 0.35);
      background-color: white;
      cursor: col-resize;
      i {
        width: 1px;
        height: 14px;
        background-color: #e9e9e9;
        margin: 0 1px;
      }
    }
  }

  .right-content {
    flex: 1;
  }

  .left-content,.right-content {
    overflow: auto;
  }
}
</style>
