<script setup lang="ts">
  import { computed, type CSSProperties } from 'vue';
  import { Icon as IconifyIcon } from '@iconify/vue';
  import { isString, omit } from 'lodash-es';
  import SvgIcon from './src/SvgIcon.vue';
  import IconFont from './src/icon-font';
  import type { IconProps } from './src/props';

  const props = withDefaults(defineProps<IconProps>(), {
    type: 'iconify',
    size: 16,
  });

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
    />
  </template>
</template>

<style lang="less" scoped></style>
