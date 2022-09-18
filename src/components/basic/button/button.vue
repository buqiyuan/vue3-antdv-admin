<template>
  <Button
    v-bind="{ ...$attrs, ...props }"
    :type="buttonType"
    :class="[`ant-btn-${type}`, { 'basic-btn': colorVar }]"
  >
    <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </Button>
</template>
<script lang="ts" setup>
  import { computed, type ComputedRef } from 'vue';
  import { Button } from 'ant-design-vue';
  import { buttonProps, typeColorMap, buttonTypes } from './button';
  import type { ButtonType } from './button';
  import type { ButtonType as AButtonType } from 'ant-design-vue/es/button';

  const props = defineProps({
    ...buttonProps(),
    type: {
      type: String as PropType<ButtonType>,
    },
    // 自定义按钮颜色
    color: String,
  });

  const buttonType = computed(() => {
    const type = props.type!;
    return buttonTypes.includes(type)
      ? (type as ButtonType)
      : Reflect.has(typeColorMap, type) || props.color
      ? 'primary'
      : 'default';
  }) as ComputedRef<AButtonType>;

  const colorVar = computed(() => {
    return props.color || typeColorMap[props.type!];
  });
</script>

<style scoped>
  .basic-btn {
    --ant-primary-color: v-bind(colorVar);
    --ant-primary-color-hover: v-bind(colorVar);
    --ant-primary-color-active: v-bind(colorVar);
  }
</style>
