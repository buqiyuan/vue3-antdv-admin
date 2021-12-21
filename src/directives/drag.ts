import type { ObjectDirective } from 'vue';

export const vDrag: ObjectDirective = {
  mounted(el: HTMLDivElement, binding) {
    // a-modal不能绑定指令，故放弃指令方式控制拖拽。
    console.log('v-drag', el, binding);
  },
};
