<template>
  <router-view :key="notNeedKey ? 'key' : route.fullPath" v-slot="{ Component }">
    <transition v-if="animate" name="zoom-fade" mode="out-in" appear>
      <component :is="Component"/>
    </transition>
    <component v-else :is="Component"/>
  </router-view>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRoute} from "vue-router";

export default defineComponent({
  name: "router-transition",
  props: {
    notNeedKey: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  setup() {

    return {
      route: useRoute()
    }
  }
})
</script>
