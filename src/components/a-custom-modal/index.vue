<template>
  <template v-if="destroyOnClose && !visible"></template>
  <template v-else>
    <teleport to="body">
      <div ref="modalRootRef" class="ant-modal-root custom-modal">
        <transition key="mask" v-bind="maskTransitionProps">
          <div v-show="visible" class="ant-modal-mask"></div>
        </transition>
        <transition key="dialog" v-bind="dialogTransitionProps">
          <div ref="modalWrapRef" v-if="visible" class="ant-modal-wrap" >
            <div ref="dragRef" class="ant-modal">
              <div class="ant-modal-content">
                <div ref="titleRef" class="ant-modal-header">
                  <span class="ant-modal-title">{{ title }}</span>
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
                <div v-if="footer != null" ref="modalFooter" class="ant-modal-footer">
                  <slot name="footer">
                    <div>
                      <a-button @click="closeModal">取 消</a-button>
                      <a-button @click="closeModal" type="primary" :loading="confirmLoading">确 认</a-button>
                    </div>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </teleport>
  </template>
</template>

<script lang="ts">
import {defineComponent, PropType, SetupContext,} from 'vue'
import { Transition } from 'ant-design-vue/lib/_util/transition'
import {Modal} from 'ant-design-vue'
import useModal from "@/components/a-custom-modal/useModal";

export default defineComponent({
  name: "a-custom-modal",
  emits: ['update:visible'],
  components: {Transition},
  props: {
    title: {
      type: String as PropType<string>,
      default: '标题'
    },
    visible: { // 弹出显隐
      type: Boolean as PropType<boolean>,
      default: false
    },
    destroyOnClose: { // 关闭后销毁
      type: Boolean as PropType<boolean>,
      default: false
    },
    footer: { // 底部内容，当不需要默认底部按钮时，可以设为 :footer="null"	string|slot
      default: 'I am footer'
    },
    confirmLoading: { // 确定按钮 loading
      type: Boolean as PropType<boolean>,
      default: false
    },
    centered: { // 垂直居中展示 Modal
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, ctx: SetupContext ) {
      return useModal(props, ctx)
  }
})
</script>

<style lang="scss">
@import './style';
</style>
