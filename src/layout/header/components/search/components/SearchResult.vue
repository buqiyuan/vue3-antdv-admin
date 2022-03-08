<template>
  <div>
    <div class="pb-12px">
      <template v-for="item in options" :key="item.name">
        <div
          class="bg-[#e5e7eb] h-56px mt-8px px-14px rounded-4px flex items-center justify-justify-between"
          style="cursor: pointer"
          :style="{
            background: item.name === active ? '#1890ff' : '',
            color: item.name === active ? '#fff' : '',
          }"
          @click="handleTo"
          @mouseenter="handleMouse(item)"
        >
          <BookOutlined />
          <TitleI18n class="flex-1 ml-5px" :title="item.meta?.title" />
          <EnterOutlined class="icon text-20px p-2px mr-3px" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { EnterOutlined, BookOutlined } from '@ant-design/icons-vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { TitleI18n } from '@/components/basic/title-i18n';

  interface Props {
    value: string;
    options: RouteRecordRaw[];
  }

  interface Emits {
    (e: 'update:value', val: string): void;
    (e: 'enter'): void;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emits>();

  const active = computed({
    get() {
      return props.value;
    },
    set(val: string) {
      emit('update:value', val);
    },
  });
  /** 鼠标移入 */
  async function handleMouse(item: RouteRecordRaw) {
    active.value = item.name as string;
  }

  function handleTo() {
    emit('enter');
  }
</script>
<style lang="less" scoped></style>
