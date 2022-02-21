<template>
  <Popover placement="bottomLeft" trigger="click">
    <template #content>
      <NodePanel ref="nodePanelRef" :options="myOptions" />
    </template>
    <div class="input-box">
      <Input placeholder="请选择">
        <template #prefix v-if="getTags.length">
          <template v-for="tag in getTags" :key="tag.value">
            <Tag class="tag-item" closable @close.prevent="delTag(tag)">{{ tag.label }}</Tag>
          </template>
          <CloseCircleOutlined class="clear-icon" @click.prevent="clearTag" />
        </template>
      </Input>
    </div>
  </Popover>
</template>
<script lang="ts" setup>
  import { Form, Input, Popover, Tag } from 'ant-design-vue';
  import { watch, computed, ref } from 'vue';
  import { formarPermsToCascader } from '@/core/permission';
  import NodePanel from './node-panel.vue';
  import { useVModel } from '@vueuse/core';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  // import { cloneDeep } from 'lodash-es';
  import { updateNodeCheckStatus, CascaderOptionType, Key } from './utils';

  type TagItem = {
    label: Key;
    value: Key;
    node: CascaderOptionType;
  };

  const props = defineProps({
    // options: {
    //   type: Array as PropType<CascaderOptionType[]>,
    //   default: formarPermsToCascader,
    // },
    value: {
      type: Array,
      default: () => [],
      isRequired: true,
    },
  });
  // 数组去重
  // const duplicateArr = (...rest: any[]) => [...new Set(rest.flat(Infinity))];
  // // 数组差集
  // const diffArr = (a, b) => a.filter((n) => !b.includes(n));

  const emit = defineEmits(['update:value']);

  const checkedList = useVModel(props, 'value', emit);
  const nodePanelRef = ref<any>();

  const myOptions = ref<CascaderOptionType[]>(formarPermsToCascader());

  const formItemContext = Form.useInjectFormItemContext();

  const getLastChildren = (children: CascaderOptionType[], arr: TagItem[] = []) => {
    return children.reduce((prev, curr) => {
      if (!curr.children?.length && curr.checked && curr.value) {
        prev.push({
          label: curr.value,
          value: curr.value,
          node: curr,
        });
      }
      if (curr.children?.length) {
        getLastChildren(curr.children, prev);
      }
      return prev;
    }, arr);
  };

  const initOptions = (options: CascaderOptionType[]) => {
    const hasSomeChildChecked = (children: CascaderOptionType[]) => {
      return children.some((n) => {
        if (checkedList.value.includes(n.value)) {
          return true;
        } else if (n.children?.length) {
          return hasSomeChildChecked(n.children);
        } else {
          return false;
        }
      });
    };

    const formatOptionsWithCheck = (
      options: CascaderOptionType[],
      parent: CascaderOptionType | null = null,
    ) => {
      options?.forEach((item) => {
        if (item.children?.length) {
          formatOptionsWithCheck(item.children, item);
        }
        item.parent = parent;
        item.indeterminate = false;
        item.checked = checkedList.value.includes(item.value);

        if (item.children?.length) {
          item.indeterminate = hasSomeChildChecked(item.children);
        }
      });
    };

    formatOptionsWithCheck(options);
  };
  initOptions(myOptions.value);

  /**
   * @description 删除tag
   */
  const delTag = (tag: TagItem) => {
    updateNodeCheckStatus(false, tag.node);
  };

  const clearTag = () => {
    checkedList.value = [];
    setTimeout(() => {
      myOptions.value = formarPermsToCascader();
      initOptions(myOptions.value);
      nodePanelRef.value?.clearCheck();
    });
  };

  const getTags = computed(() => getLastChildren(myOptions.value));

  watch(
    () => getTags.value,
    (val) => {
      checkedList.value = val.map((n) => n.value);
      formItemContext.onFieldChange();
      console.log('onFieldChange', 12);
    },
  );

  // watchEffect(() => {
  //   const cloneOptions = cloneDeep(props.options);
  // console.log('cloneOptions', cloneOptions);
  //   initOptions(cloneOptions);
  //   myOptions.value = cloneOptions;
  // });
</script>

<style lang="less" scoped>
  .input-box {
    display: flex;

    .clear-icon {
      display: none;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover .clear-icon {
      display: block;
    }
    :deep(.ant-input-prefix) {
      width: 100%;
      flex-wrap: wrap;
    }
    .tag-item {
      @apply my-2px;
    }
  }
</style>
