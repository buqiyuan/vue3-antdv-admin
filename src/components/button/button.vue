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

<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { PropType, defineComponent, computed } from 'vue';
  import type { ButtonType } from 'ant-design-vue/lib/button/buttonTypes';
  // import buttonProps from 'ant-design-vue/lib/button/buttonTypes'

  const buttonTypes = ['default', 'primary', 'ghost', 'dashed', 'link'];

  export default defineComponent({
    name: 'AButton',
    components: { 'antd-button': Button },
    inheritAttrs: false, // 换个名称，避免成死递归组件
    props: {
      type: {
        type: String as PropType<ButtonType | 'danger' | 'warning' | 'success'>,
        default: 'default',
      },
    },
    setup(props) {
      const buttonType = computed(() => {
        const type = props.type;
        return buttonTypes.includes(type)
          ? (type as ButtonType)
          : ['danger'].includes(type)
          ? 'primary'
          : 'default';
      });

      return {
        buttonTypes,
        buttonType,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import './styles/success';
</style>

<style lang="less" scoped>
  @import './styles/warning';
</style>
