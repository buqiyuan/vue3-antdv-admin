<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';

  const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context('@/assets/icons', true, /\.svg$/));
  } catch (error) {
    console.log(error);
  }

  interface Props {
    iconClass: string;
    className?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    className: '',
  });

  const iconName = computed(() => `#icon-${props.iconClass}`);
  const svgClass = computed(() => 'svg-icon');
</script>

<style lang="less" scoped>
  .svg-icon {
    position: relative;
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
      cursor: pointer;
      content: '';
    }
  }
</style>
