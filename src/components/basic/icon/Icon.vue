<script setup lang="ts">
  import { computed, type CSSProperties, type VNode } from 'vue';
  import { useAttrs } from 'vue';
  import { Icon as IconifyIcon } from '@iconify/vue';
  import { isString, omit } from 'lodash-es';
  import SvgIcon from './src/SvgIcon.vue';
  import IconFont from './src/icon-font';
  import type { IconProps } from './src/props';

  const props = withDefaults(defineProps<IconProps>(), {
    type: 'iconify',
    size: 16,
  });

  const attrs = useAttrs();

  const getWrapStyle = computed((): CSSProperties => {
    const { size, color } = props;
    let fs = size;
    if (isString(size)) {
      fs = parseInt(size, 10);
    }

    return {
      fontSize: `${fs}px`,
      color,
      display: 'inline-flex',
    };
  });

  /** svg 不支持 title 属性，需要在其元素内部手动添加 title 标签 */
  const handleIconUpdated = (vnode: VNode) => {
    const title = attrs.title;
    if (vnode.el && title) {
      vnode.el.insertAdjacentHTML?.('afterbegin', `<title>${title}</title>`);
    }
  };
</script>

<template>
  <template v-if="type === 'svg'">
    <SvgIcon v-bind="{ ...$attrs, ...props }" :name="icon" class="anticon" />
  </template>
  <template v-else-if="type === 'icon-font'">
    <IconFont v-bind="{ ...$attrs, ...props }" :type="icon" />
  </template>
  <template v-else>
    <IconifyIcon
      v-bind="omit({ ...$attrs, ...props }, ['size', 'color'])"
      :style="getWrapStyle"
      class="anticon"
      @vue:updated="handleIconUpdated"
    />
  </template>
</template>

<style lang="less" scoped></style>
