<template>
  <ProConfigProvider :theme="btnTheme">
    <Button v-bind="{ ...$attrs, ...props }" :type="buttonType">
      <template v-for="(_, key) in $slots" #[key]>
        <slot :name="key" />
      </template>
    </Button>
  </ProConfigProvider>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Button } from 'ant-design-vue';
  import { buttonProps, buttonColorPrimary, aButtonTypes } from './button';
  import type { ButtonType, AButtonType } from './button';

  defineOptions({
    name: 'AButton',
  });

  const props = defineProps({
    ...buttonProps(),
    type: {
      type: String as PropType<ButtonType>,
    },
    // 自定义按钮颜色
    color: String,
  });

  const isCustomType = computed(() => Reflect.has(buttonColorPrimary, props.type!));

  const buttonType = computed<AButtonType>(() => {
    if (props.type && aButtonTypes.includes(props.type)) {
      return props.type as AButtonType;
    } else if (props.color || isCustomType.value) {
      return 'primary';
    }
    return 'default';
  });

  const btnTheme = computed(() => {
    const type = props.type!;
    if (props.color || isCustomType.value) {
      return {
        token: {
          colorPrimary: props.color || buttonColorPrimary[type],
        },
      };
    }
    return undefined;
  });
</script>
