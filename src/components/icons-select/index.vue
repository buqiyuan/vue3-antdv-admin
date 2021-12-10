<template>
  <Popover v-model:visible="visible" placement="bottomLeft" trigger="focus">
    <template #content>
      <div class="select-box">
        <template v-for="iconItem in icons" :key="iconItem.code">
          <div
            :title="iconItem.title"
            class="select-box-item"
            :class="{ active: modelValue == iconItem.code }"
            @click="selectIcon(iconItem)"
          >
            <icon-font :type="iconItem.code" size="20" />
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

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Popover } from 'ant-design-vue';
  import { IconFont } from '@/components/iconfont';
  import icons from './icons';
  import { useVModel } from '@vueuse/core';

  export default defineComponent({
    name: 'DemoIcons',
    components: { IconFont, Popover },
    props: {
      value: String,
      placeholder: {
        type: String,
        default: '请选择',
      },
    },
    setup(props, { emit }) {
      const visible = ref(false);
      const modelValue = useVModel(props, 'value', emit);

      const selectIcon = (iconItem: typeof icons[number]) => {
        modelValue.value = iconItem.code;
        visible.value = false;
      };

      return {
        icons,
        modelValue,
        visible,
        selectIcon,
      };
    },
  });
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
