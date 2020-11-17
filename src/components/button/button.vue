<template>
    <Button
        v-bind="$attrs"
        :type="buttonTypes.includes(type) ? type : 'default'"
        :class="[`ant-btn-${type}`]"
    >
    {{type}}
    <slot/>
  </Button>
</template>

<script lang="ts">
import {Button} from 'ant-design-vue'
// import buttonProps from 'ant-design-vue/lib/button/buttonTypes'

const buttonTypes = ["default", "primary", "ghost", "dashed", "danger", "link"]

export default {
  name: "a-button",
  components: {Button},
  props: {
    type: String
  },
  setup(props) {
    console.log(props, 'sfsfsewr')
    return {
      buttonTypes
    }
  }
}
</script>

<style lang="less" scoped>
@import "./warning";
</style>
