<template>
  <router-view v-slot="{ Component, route }">
    <transition name="zoom-fade" mode="out-in" appear>
      <keep-alive :include="keepAliveComponents" :max="10">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import {defineComponent, watch, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";

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
    // const router = useRouter()
    const route = useRoute()
    // 需要缓存的路由组件
    const keepAliveComponents = ref<string[]>([])
    // 获取需要缓存的组件
    // const getKeepAliveComponents = () => {
    //   const comNames = router.getRoutes()
    //       .filter(item => item?.meta.keepAlive)
    //       .map(item => item?.meta?.componentName?.replace(/\B([A-Z])/g, "-$1").toLowerCase() || '')
    //   return [...new Set(comNames)]
    // }

    watch(() => route.fullPath, () => {
      const currentComName = route.matched.find(item => item.name == route.name)?.components?.default.name
      if (currentComName && !keepAliveComponents.value.includes(currentComName) && route.meta?.keepAlive) {
        keepAliveComponents.value.push(currentComName)
      } else if (!route.meta?.keepAlive) {
        const index = keepAliveComponents.value.findIndex(name => name == currentComName)
        if (index != -1) {
          keepAliveComponents.value.splice(index, 1)
        }
      }
    }, {immediate: true})

    return {
      keepAliveComponents
    }
  }
})
</script>
