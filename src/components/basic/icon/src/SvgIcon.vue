<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue';
  import { svgIconProps } from './props';

  defineOptions({
    name: 'SvgIcon',
  });

  const props = defineProps(svgIconProps);
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    const s = `${size}`.replace('px', '').concat('px');
    return {
      width: s,
      height: s,
    };
  });
</script>

<style lang="less">
  .svg-icon {
    overflow: hidden;
    fill: currentcolor;
    vertical-align: -0.15em;
  }
</style>
