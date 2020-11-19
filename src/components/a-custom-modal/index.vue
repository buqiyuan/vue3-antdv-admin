<template>
  <teleport to="body">
    <div v-show="visible" ref="modalRootRef" class="ant-modal-root custom-modal">
      <div class="ant-modal-mask"></div>
      <div class="ant-modal-wrap">
        <div ref="dragRef" class="ant-modal">
          <div class="ant-modal-content">
            <div ref="titleRef" class="ant-modal-header">
              <span class="ant-modal-title">这是一个可以拖动的窗口</span>
              <div class="ant-modal-operate">
                <button ref="minRef" type="button" class="min" title="最小化"></button>
                <button ref="maxRef" type="button" class="max" title="最大化"></button>
                <button ref="revertRef" type="button" class="revert" title="还原"></button>
                <button @click="closeModal" type="button" class="close" title="关闭"></button>
              </div>
            </div>
            <div ref="resizeLRef" class="resizeL"></div>
            <div ref="resizeTRef" class="resizeT"></div>
            <div ref="resizeRRef" class="resizeR"></div>
            <div ref="resizeBRef" class="resizeB"></div>
            <div ref="resizeLTRef" class="resizeLT"></div>
            <div ref="resizeTRRef" class="resizeTR"></div>
            <div ref="resizeBRRef" class="resizeBR"></div>
            <div ref="resizeLBRef" class="resizeLB"></div>
            <div ref="modalBody" class="ant-modal-body">
              <slot>
                ① 窗口可以拖动；<br/>
                ② 窗口可以通过八个方向改变大小；<br/>
                ③ 窗口可以最小化、最大化、还原、关闭；<br/>
                ④ 限制窗口最小宽度/高度。
              </slot>
            </div>
            <div ref="modalFooter" class="ant-modal-footer">
              <div>
                <a-button @click="closeModal">取 消</a-button>
                <a-button @click="closeModal" type="primary">确 认</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, PropType, watch, nextTick, SetupContext, ref} from 'vue'

export default defineComponent({
  name: "a-custom-modal",
  emits: ['update:visible'],
  props: {
    visible: { // 弹出显隐
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, attrs}: SetupContext ) {
    const dragRef = ref<any>(null);
    const modalBody = ref<any>(null);
    const modalFooter = ref<any>(null);
    const titleRef = ref<any>(null);
    const resizeLRef = ref<any>(null);
    const resizeTRef = ref<any>(null);
    const resizeRRef = ref<any>(null);
    const resizeBRef = ref<any>(null);
    const resizeLTRef = ref<any>(null);
    const resizeTRRef = ref<any>(null);
    const resizeBRRef = ref<any>(null);
    const resizeLBRef = ref<any>(null);
    const minRef = ref<any>(null);
    const maxRef = ref<any>(null);
    const revertRef = ref<any>(null);

    // 最小可调整的宽高
    const dragMinHeight = 140
    const dragMinWidth = 400
    // 弹窗原始位置，用于放大后恢复到原来的位置大小
    let modalWidth,modalHeight,modalLeft,modalTop
    // 头部标题高度、底部高度
    let headerHeight, footerHeight = 0

    function drag(oDrag, handle) {
      let disX = 0;
      const dixY = 0;
      handle = handle || oDrag;
      handle.style.cursor = "move";
      handle.onmousedown = function (event) {
        event = event || window.event;
        disX = event.clientX - oDrag.offsetLeft;
        const disY = event.clientY - oDrag.offsetTop;

        const mousemove = (event) => {
          let iL = event.clientX - disX;
          let iT = event.clientY - disY;
          const maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
          const maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

          iL <= 0 && (iL = 0);
          iT <= 0 && (iT = 0);
          iL >= maxL && (iL = maxL);
          iT >= maxT && (iT = maxT);

          oDrag.style.left = iL + "px";
          oDrag.style.top = iT + "px";

          return false
        }

        const mouseup = () => {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
        }

        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        return false
      };
      //最大化按钮
      maxRef.value.onclick = function () {
        const {left,top} = getComputedStyle(oDrag)
        const {width,height} = getComputedStyle(modalBody.value)
        console.log({width,height,left,top})
        // 最大化时，保存原来的位置大小
        modalWidth = width
        modalHeight = height
        modalLeft = left
        modalTop = top
        oDrag.style.top = oDrag.style.left = 0;
        oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
        oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
        modalBody.value.style.width = oDrag.style.width
        modalBody.value.style.height = parseFloat(oDrag.style.height) - headerHeight - footerHeight + 'px'
        this.style.display = "none";
        revertRef.value.style.display = "block";
      };
      //还原按钮
      revertRef.value.onclick = function () {
        modalBody.value.style.height = modalHeight
        modalBody.value.style.width = modalWidth
        oDrag.style.width = oDrag.style.height = 'unset'
        // oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
        // oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
        oDrag.style.left = modalLeft
        oDrag.style.top = modalTop
        this.style.display = "none";
        maxRef.value.style.display = "block";
      };

    }

    function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
      handle.onmousedown = function (event) {
        const disX = event.clientX - handle.offsetLeft;
        const disY = event.clientY - handle.offsetTop;
        const iParentTop = oParent.offsetTop;
        const iParentLeft = oParent.offsetLeft;
        const iParentWidth = oParent.offsetWidth;
        const iParentHeight = oParent.offsetHeight;

        const mousemove = (event) => {
          const iL = event.clientX - disX;
          const iT = event.clientY - disY ;
          const maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
          const maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
          let iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
          let iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;

          isLeft && (oParent.style.left = iParentLeft + iL + "px");
          isTop && (oParent.style.top = iParentTop + iT + "px");

          iW < dragMinWidth && (iW = dragMinWidth);
          iW > maxW && (iW = maxW);
          lockX || (modalBody.value.style.width = iW + "px");

          iH < dragMinHeight && (iH = dragMinHeight);
          iH > maxH && (iH = maxH);
          lockY || (modalBody.value.style.height = iH - footerHeight - headerHeight + "px");

          if ((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
          if (isLeft || isTop) document.onmousemove = null;

          return false;
        }

        const mouseup = () => {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
        }

        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        return false;
      }
    }

    const initWin = () => {

      drag(dragRef.value, titleRef.value);
      //四角
      resize(dragRef.value, resizeLTRef.value, true, true, false, false);
      resize(dragRef.value, resizeTRRef.value, false, true, false, false);
      resize(dragRef.value, resizeBRRef.value, false, false, false, false);
      resize(dragRef.value, resizeLBRef.value, true, false, false, false);
      //四边
      resize(dragRef.value, resizeLRef.value, true, false, false, true);
      resize(dragRef.value, resizeTRef.value, false, true, true, false);
      resize(dragRef.value, resizeRRef.value, false, false, false, true);
      resize(dragRef.value, resizeBRef.value, false, false, true, false);

      dragRef.value.style.left = (document.documentElement.clientWidth - dragRef.value.offsetWidth) / 2 + "px";
      dragRef.value.style.top = (document.documentElement.clientHeight - dragRef.value.offsetHeight) / 2 + "px";
    }

    // 关闭弹窗
    const closeModal = () => {
      emit('update:visible', false)
    }

    onMounted(() => {
      watch(() => props.visible, value => {
        if (value) {
          nextTick(() => {
            headerHeight = titleRef.value?.offsetHeight
            footerHeight = modalFooter.value?.offsetHeight
            initWin()
            window.addEventListener('resize', initWin)
          })
        }
      }, {immediate: true})
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', initWin)
    })

    return {
      dragRef,
      modalBody,
      modalFooter,
      titleRef,
      resizeLRef,
      resizeTRef,
      resizeRRef,
      resizeBRef,
      resizeLTRef,
      resizeTRRef,
      resizeBRRef,
      resizeLBRef,
      minRef,
      maxRef,
      revertRef,
      closeModal
    }
  }
})
</script>

<style lang="scss">
.custom-modal {
  .ant-modal-wrap {
    .ant-modal {
      position: absolute;
      min-width: 400px;
      min-height: 140px;
      padding-bottom: 0;

      .ant-modal-content {
        height: 100%;

        .ant-modal-header {
          display: flex;
          justify-content: space-between;

          .ant-modal-operate {
            display: flex;

            button, button.open {
              width: 21px;
              height: 19px;
              line-height: 56px;
              display: block;
              border: 0;
              cursor: pointer;
              margin-left: 5px;
              background: url(~@/assets/images/tool.png) no-repeat;
            }

            button.open {
              position: absolute;
              top: 10px;
              left: 50%;
              margin-left: -10px;
              background-position: 0 0;
            }

            button.open:hover {
              background-position: 0 -29px;
            }

            button.min {
              background-position: -29px 0;
            }

            button.min:hover {
              background-position: -29px -29px;
            }

            button.max {
              background-position: -60px 0;
            }

            button.max:hover {
              background-position: -60px -29px;
            }

            button.revert {
              background-position: -149px 0;
              display: none;
            }

            button.revert:hover {
              background-position: -149px -29px;
            }

            button.close {
              background-position: -89px 0;
            }

            button.close:hover {
              background-position: -89px -29px;
            }
          }
        }

        .ant-modal-body {
          overflow: auto;
        }

        .resizeL, .resizeT, .resizeR, .resizeB, .resizeLT, .resizeTR, .resizeLB {
          position: absolute;
          background: #000;
          overflow: hidden;
          opacity: 0;
          filter: alpha(opacity=0);
        }

        .resizeL, .resizeR {
          top: 0;
          width: 5px;
          height: 100%;
          cursor: w-resize;
        }

        .resizeR {
          right: 0;
        }

        .resizeT, .resizeB {
          width: 100%;
          height: 5px;
          cursor: n-resize;
        }

        .resizeT {
          top: 0;
        }

        .resizeB {
          bottom: 0;
        }

        .resizeLT, .resizeTR, .resizeLB {
          width: 8px;
          height: 8px;
          background: #FF0;
        }

        .resizeLT {
          top: 0;
          left: 0;
          cursor: nw-resize;
        }

        .resizeTR {
          top: 0;
          right: 0;
          cursor: ne-resize;
        }

        .resizeLB {
          left: 0;
          bottom: 0;
          cursor: ne-resize;
        }

        .resizeBR {
          position: absolute;
          width: 14px;
          height: 14px;
          right: 0;
          bottom: 0;
          overflow: hidden;
          cursor: nw-resize;
          background: url(https://www.17sucai.com/preview/65612/2014-02-17/Desktop1/img/resize.png) no-repeat;
        }
      }
    }
  }
}
</style>
