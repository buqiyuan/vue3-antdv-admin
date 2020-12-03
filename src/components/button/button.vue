<template>
    <Button
        v-bind="$attrs"
        :type="buttonTypes.includes(type) ? type : 'default'"
        :class="[`ant-btn-${type}`]"
    >
    <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
      <slot :name="key"></slot>
    </template>
  </Button>
</template>

<script lang="ts">
import {Button} from 'ant-design-vue'
import {PropType, defineComponent} from "vue";
import {ButtonType} from "ant-design-vue/lib/button/buttonTypes";
// import buttonProps from 'ant-design-vue/lib/button/buttonTypes'

const buttonTypes = ["default", "primary", "ghost", "dashed", "danger", "link"]

export default defineComponent({
  name: "a-button",
  components: {Button},
  props: {
    type: {
      type: String as PropType<ButtonType | "warning" | 'success'>,
      default: 'default'
    }
  },
  setup(props) {
    return {
      buttonTypes
    }
  }
})
</script>

<style lang="less" scoped>
@import "./styles/success";
</style>

<style lang="less" scoped>
@import "./styles/warning";
</style>
