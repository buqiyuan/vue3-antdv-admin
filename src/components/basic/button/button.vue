<template>
  <Button
    v-bind="props"
    :danger="['danger'].includes(type)"
    :type="buttonType"
    :class="[`ant-btn-${type}`]"
  >
    <template v-for="(value, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </Button>
</template>
<script lang="ts" setup>
  import { computed, type PropType } from 'vue';
  import { Button } from 'ant-design-vue';
  import { buttonProps, type ButtonType } from './button';

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
  });
</script>

<style lang="less" scoped>
  @import 'styles/success';
</style>

<style lang="less" scoped>
  @import 'styles/warning';
</style>
