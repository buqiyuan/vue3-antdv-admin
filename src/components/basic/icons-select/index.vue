<template>
  <Popover v-model:visible="visible" placement="bottomLeft" trigger="focus">
    <template #content>
      <div class="select-box">
        <template v-for="iconItem in glyphs" :key="iconItem.font_class">
          <div
            :title="iconItem.name"
            class="select-box-item"
            :class="{ active: modelValue?.replace('icon-', '') == iconItem.font_class }"
            @click="selectIcon(iconItem)"
          >
            <icon-font :type="iconItem.font_class" size="20" />
          </div>
        </template>
      </div>
    </template>
    <a-input v-model:value="modelValue" :placeholder="placeholder">
      <template v-if="modelValue" #prefix>
        <icon-font :type="modelValue" size="22" />
      </template>
    </a-input>
  </Popover>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Popover } from 'ant-design-vue';
  import { IconFont } from '@/components/basic/iconfont';
  import icons from './icons.json';
  import { useVModel } from '@vueuse/core';

  const { glyphs } = icons;

  interface Props {
    value: string;
    placeholder?: string;
  }

  interface Emits {
    (e: 'update:value', val: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    placeholder: '请选择',
  });

  const emit = defineEmits<Emits>();

  const visible = ref(false);
  const modelValue = useVModel(props, 'value', emit);

  const selectIcon = (iconItem: typeof glyphs[number]) => {
    modelValue.value = iconItem.font_class;
    visible.value = false;
  };
</script>
<style lang="less" scoped>
  .select-box {
    @apply grid grid-cols-9 h-300px overflow-auto;

    &-item {
      @apply flex m-2px p-6px;
      border: 1px solid #e5e7eb;

      &:hover,
      &.active {
        @apply border-blue-600;
      }
    }
  }
</style>
