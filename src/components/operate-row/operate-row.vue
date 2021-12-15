<template>
  <div class="actions">
    <slot name="before"></slot>
    <template v-if="!hideDel">
      <Popconfirm title="您确定要删除该节点吗?" @confirm="() => $emit('delete')">
        <delete-outlined @click.stop />
      </Popconfirm>
    </template>
    <form-outlined v-if="!hideEdit" @click="$emit('edit')" />
    <plus-outlined v-if="!hideAdd" @click="$emit('add')" />
    <slot name="after"></slot>
  </div>
</template>
<script lang="ts" setup>
  import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { Popconfirm } from 'ant-design-vue';

  interface Props {
    hideAdd: boolean;
    hideDel: boolean;
    hideEdit: boolean;
  }

  interface Emits {
    (e: 'delete'): void;
    (e: 'edit'): void;
    (e: 'add'): void;
  }

  withDefaults(defineProps<Props>(), {
    hideAdd: false,
    hideDel: false,
    hideEdit: false,
  });

  defineEmits<Emits>();
</script>

<style lang="less" scoped>
  .actions {
    display: none;
    float: right;

    > :deep(span) {
      margin-left: 5px;

      &:hover {
        color: #40a9ff;
      }
    }
  }
</style>
