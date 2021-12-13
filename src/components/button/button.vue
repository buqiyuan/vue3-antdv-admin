<template>
  <antd-button
    :danger="['danger'].includes(type)"
    v-bind="$attrs"
    :type="buttonType"
    :class="[`ant-btn-${type}`]"
  >
    <template v-for="(value, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </antd-button>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { computed } from 'vue';
  import type { ButtonType } from 'ant-design-vue/lib/button/buttonTypes';
  // import buttonProps from 'ant-design-vue/lib/button/buttonTypes'

  interface Props {
    type: ButtonType | 'danger' | 'warning' | 'success';
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'default',
  });

  // 换个名称，避免成死递归组件
  const AntdButton = Button;
  const buttonTypes = ['default', 'primary', 'ghost', 'dashed', 'link'];
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
  @import './styles/success';
</style>

<style lang="less" scoped>
  @import './styles/warning';
</style>
