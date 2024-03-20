<template>
  <a-form-item-rest>
    <a-popover
      v-model:open="visible"
      placement="bottomLeft"
      :overlay-inner-style="{ paddingTop: 0 }"
      trigger="click"
    >
      <template #title>
        <a-tabs
          v-model:activeKey="activeCateName"
          size="small"
          :tab-bar-style="{ marginBottom: '8px' }"
        >
          <a-tab-pane v-for="(_, cateName) in iconsMap" :key="cateName" :tab="cateName" />
        </a-tabs>
        <a-input
          autofocus
          allow-clear
          :placeholder="`从“${activeCateName}”中搜索图标`"
          @change="handleSearchChange"
        />
      </template>
      <template #content>
        <RecycleScroller
          class="select-box"
          :items="iconFilteredList"
          key-field="name"
          :item-size="38"
          :grid-items="9"
          :item-secondary-size="38"
        >
          <template #default="{ item }">
            <div
              :key="item.name"
              :title="item.name"
              :class="{ active: modelValue == item.name }"
              class="select-box-item"
              @click="selectIcon(item.name)"
            >
              <Icon :icon="item.name" class="text-[20px]" />
            </div>
          </template>
        </RecycleScroller>
      </template>

      <a-input v-bind="$attrs" v-model:value="modelValue" :placeholder="placeholder" allow-clear>
        <template v-if="modelValue" #prefix>
          <Icon :icon="modelValue" class="text-[20px]" />
        </template>
      </a-input>
    </a-popover>
  </a-form-item-rest>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Icon } from '@iconify/vue';
  import { RecycleScroller } from 'vue-virtual-scroller';
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
  import { useDebounceFn } from '@vueuse/core';
  import { setupIcons, icons } from './icons.data';
  import { iconPickerProps } from './props';

  // 添加默认图标集合
  setupIcons();

  defineOptions({
    inheritAttrs: false,
  });
  defineProps(iconPickerProps);

  const modelValue = defineModel<string>('value');

  const iconsMap = Object.entries(icons).reduce(
    (prev, [cateName, curr]) => {
      prev[cateName] = Object.keys(curr.icons).map((name) => ({ name: `${curr.prefix}:${name}` }));
      return prev;
    },
    {
      全部: Object.values(icons).flatMap((item) =>
        Object.keys(item.icons).map((name) => ({ name: `${item.prefix}:${name}` })),
      ),
    } as Recordable<{ name: string }[]>,
  );

  const visible = ref(false);
  const activeCateName = ref('全部');
  const keyword = ref('');

  const iconFilteredList = computed(() => {
    const list = iconsMap[activeCateName.value];
    return list.filter((item) => item.name.includes(keyword.value));
  });

  const handleSearchChange = useDebounceFn((e: Event) => {
    keyword.value = (e.target as HTMLInputElement).value;
  }, 100);

  const selectIcon = (name: string) => {
    modelValue.value = name;
    visible.value = false;
  };
</script>

<style lang="less" scoped>
  .select-box {
    @apply h-300px min-w-350px;

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
