<template>
  <config-provider v-show="!isLock" :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </config-provider>
  <transition name="slide-up">
    <lock-screen v-if="isLock"/>
  </transition>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted, onUnmounted} from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {ConfigProvider} from 'ant-design-vue'
import {LockScreen} from '@/components/lockscreen'
import {useStore} from 'vuex'
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'App',
  components: {ConfigProvider, LockScreen},
  setup() {

    const route = useRoute()
    const store = useStore()
    const isLock = computed(() => store.state.lockscreen.isLock)
    const lockTime = computed(() => store.state.lockscreen.lockTime)

    let timer

    const timekeeping = () => {
      clearInterval(timer)
      if (route.name == 'login' || isLock.value) return
      // 设置不锁屏
      store.commit('lockscreen/setLock', false)
      // 重置锁屏时间
      store.commit('lockscreen/setLockTime')
      timer = setInterval(() => {
        // 锁屏倒计时递减
        store.commit('lockscreen/setLockTime', lockTime.value - 1)
        if (lockTime.value <= 0) {
          // 设置锁屏
          store.commit('lockscreen/setLock', true)
          return clearInterval(timer)
        }
        // console.log(lockTime.value, '锁屏倒计时')
      }, 1000)
    }

    onMounted(() => {
      document.addEventListener('mousedown', timekeeping)
    })

    onUnmounted(() => {
      document.removeEventListener('mousedown', timekeeping)
    })

    return {
      zhCN,
      isLock,
    }
  }
});
</script>

<style lang="scss">
@import "~@/styles/global.scss";
@import "~@/styles/common.scss";
@import "~@/styles/override.scss";

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform .35s ease-in;
}

.slide-up-enter-form,
.slide-up-leave-to{
  transform: translateY(-100%);
}

</style>
