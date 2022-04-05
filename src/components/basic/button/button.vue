<template>
  <Button
    v-bind="props"
    :danger="['danger'].includes(type)"
    :type="buttonType"
    :class="[`ant-btn-${type}`]"
  >
    <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </Button>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Button } from 'ant-design-vue';
  import { buttonProps, type ButtonType } from './button';
  import type { PropType, ComputedRef } from 'vue';
  import type { ButtonType as AButtonType } from 'ant-design-vue/es/button';

  const props = defineProps({
    ...buttonProps(),
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
  });

  const buttonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];
  const buttonType = computed(() => {
    const type = props.type;
    return buttonTypes.includes(type)
      ? (type as ButtonType)
      : ['danger'].includes(type)
      ? 'primary'
      : 'default';
  }) as ComputedRef<AButtonType>;
</script>

<style lang="less" scoped>
  @import 'styles/success';
</style>

<style lang="less" scoped>
  @import 'styles/warning';
</style>
