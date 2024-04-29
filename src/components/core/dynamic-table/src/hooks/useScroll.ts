import { computed, ref, type Ref } from 'vue';
import { debounce, isBoolean, isString } from 'lodash-es';
import { useMutationObserver, useResizeObserver } from '@vueuse/core';
import type { DynamicTableProps } from '../dynamic-table';

type UseScrollParams = {
  props: DynamicTableProps;
  containerElRef: Ref<HTMLDivElement | null>;
};

export type UseScrollType = ReturnType<typeof useScroll>;

// 传入的元素是否有position属性
const hasPosition = (divElement: HTMLDivElement) => {
  return divElement instanceof HTMLDivElement && divElement.style.position !== '';
};

// 获取元素到顶部距离-通用方法
export const getPositionTop = (node: HTMLElement, stopElement?: HTMLDivElement) => {
  let top = node.offsetTop;
  let parent = node.offsetParent as HTMLElement;

  while (parent != null && (!stopElement || parent !== stopElement)) {
    top += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }
  return top; // 所有的父元素top和
};

export const useScroll = ({ props, containerElRef }: UseScrollParams) => {
  const scrollY = ref<number>();

  const scroll = computed(() => {
    return {
      y: scrollY.value,
      ...props.scroll,
    };
  });

  const getScrollY = debounce(() => {
    if (!props.autoHeight || !containerElRef.value) return;
    let paginationHeight = 0;
    const paginationEl = containerElRef.value.querySelector<HTMLDivElement>('.ant-pagination');
    if (paginationEl) {
      const { offsetHeight } = paginationEl;
      const { marginTop, marginBottom } = getComputedStyle(paginationEl);
      paginationHeight = offsetHeight + parseInt(marginTop) + parseInt(marginBottom);
    }
    const bodyEl =
      containerElRef.value.querySelector<HTMLDivElement>('.ant-table-body') ||
      containerElRef.value.querySelector<HTMLDivElement>('.ant-table-tbody');
    if (bodyEl) {
      let rootElHeight = document.documentElement.offsetHeight;
      let posTopHeight = getPositionTop(bodyEl as HTMLDivElement);
      if (!isBoolean(props.autoHeight) && isString(props.autoHeight)) {
        const el: HTMLDivElement = document.querySelector<HTMLDivElement>(
          props.autoHeight,
        ) as HTMLDivElement;
        if (!hasPosition(el)) {
          el.style.position = 'relative';
        }

        rootElHeight = el.offsetHeight;
        posTopHeight = getPositionTop(bodyEl as HTMLDivElement, el);
      }
      const scrollbarHeight = bodyEl.offsetHeight - bodyEl.clientHeight;
      const y = rootElHeight - posTopHeight - scrollbarHeight - paginationHeight - 8;
      scrollY.value = y;
      // console.log('innerScroll.value', rootElHeight, posTopHeight, paginationHeight, y);
    }
  }, 20);

  useMutationObserver(containerElRef, getScrollY, {
    childList: true,
    subtree: true,
  });

  useResizeObserver(document.documentElement, getScrollY);

  return {
    scroll,
  };
};
