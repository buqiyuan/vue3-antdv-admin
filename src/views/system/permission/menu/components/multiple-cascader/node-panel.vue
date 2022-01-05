<template>
  <div class="flex">
    <div class="ant-cascader-menu min-w-150px">
      <template v-for="item in options" :key="item.value">
        <div
          @click="selectItem(item.children, item.value)"
          class="check-row ant-cascader-menu-item ant-cascader-menu-item-expand"
        >
          <div>
            <Checkbox
              v-model:checked="item.checked"
              :indeterminate="item.indeterminate"
              @change="onCheckAllChange($event, item)"
            />
            <span class="label">{{ item.label }} </span>
          </div>
          <RightOutlined v-if="item.children?.length" class="arrow" />
        </div>
      </template>
    </div>
    <node-panel
      ref="nodePanelRef"
      v-if="children?.length && isChildrenInParent"
      :options="children"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { Checkbox } from 'ant-design-vue';
  import { updateNodeCheckStatus, CascaderOptionType, Key } from './utils';

  const props = defineProps({
    options: {
      type: Array as PropType<CascaderOptionType[]>,
      default: () => [],
    },
  });
  const nodePanelRef = ref<any>();
  const children = ref<CascaderOptionType[]>([]);
  const parentKey = ref<Key>();

  const getParent = () => {
    return props.options?.find((n) => n.value === parentKey.value)?.children;
  };

  const isChildrenInParent = computed(getParent);

  watch(isChildrenInParent, (val) => {
    if (!val) {
      children.value = [];
    }
  });

  const selectItem = (options: CascaderOptionType[] = [], key) => {
    children.value = options;
    parentKey.value = key;
  };

  const onCheckAllChange = (e: any, item: CascaderOptionType) => {
    const isCheck = e.target.checked;
    updateNodeCheckStatus(isCheck, item);
  };

  defineExpose({
    clearCheck: () => {
      children.value.forEach((item) => {
        item.checked = false;
        item.indeterminate = false;
      });
      if (children.value.length) {
        setTimeout(() => {
          children.value = getParent() || [];
        });
      }
      nodePanelRef.value?.clearCheck();
    },
  });
</script>

<style lang="less" scoped>
  .check-row {
    @apply flex justify-between items-center relative;
    .label {
      @apply px-10px;
    }
    .arrow {
      @apply absolute right-10px;
    }
  }
</style>
