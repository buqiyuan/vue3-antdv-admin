<template>
  <div class="actions">
    <slot name="before"></slot>
    <template v-if="!hideDel">
      <a-popconfirm
          title="您确定要删除该节点吗?"
          @confirm="() => $emit('delete')"
      >
        <delete-outlined @click.stop/>
      </a-popconfirm>
    </template>
    <form-outlined v-if="!hideEdit" @click="$emit('edit')"/>
    <plus-outlined v-if="!hideAdd" @click="$emit('add')"/>
    <slot name="after"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {DeleteOutlined, FormOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {Popconfirm} from 'ant-design-vue'

export default defineComponent({
  name: "operate-row",
  props: {
    hideAdd: {
      type: Boolean,
      default: false
    },
    hideDel: {
      type: Boolean,
      default: false
    },
    hideEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['delete', 'edit', 'add'],
  components: {DeleteOutlined, PlusOutlined, FormOutlined, [Popconfirm.name]: Popconfirm},
  setup() {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.actions {
  float: right;
  display: none;
  > ::v-deep(span) {
    margin-left: 5px;
    &:hover {
      color: #40a9ff;
    }
  }
}
</style>
