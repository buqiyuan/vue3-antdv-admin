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
    const router = useRouter()
    const route = useRoute()
    // 需要缓存的路由组件
    const keepAliveComponents = ref<string[]>([])
    // 获取需要缓存的组件
    const getKeepAliveComponents = () => {
      const comNames = router.getRoutes()
          .filter(item => item?.meta.keepAlive)
          .map(item => item?.meta.componentName.replace(/\B([A-Z])/g, "-$1").toLowerCase())
      return [...new Set(comNames)]
    }

    watch(() => route.fullPath, () => keepAliveComponents.value = getKeepAliveComponents(), {immediate: true})


    console.log(keepAliveComponents, 'keepAliveComponents')

    return {
      keepAliveComponents
    }
  }
})
</script>
