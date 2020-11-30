<template>
  <div @keyup="unLockLogin(true)" @mousedown.stop @contextmenu.prevent :class="{unLockLogin: isShowLogin}"
       class="lockscreen">
    <template v-if="!isShowLogin">
      <div class="lock-box">
        <div class="lock">
          <span @click="unLockLogin(true)" class="lock-icon" title="解锁屏幕">
            <lock-outlined/>
            <unlock-outlined/>
          </span>
        </div>
        <h6 class="tips">由于您长时间未操作，需重新输入登录密码解锁进入系统。</h6>
      </div>
      <!--      华为充电-->
      <component :is="Math.random() > 0.48 ? 'xiaomi-charge' : 'huawei-charge'" :battery="battery"
                 :battery-status="batteryStatus" :calc-discharging-time="calcDischargingTime"/>
      <!--      <xiaomi-charge :battery="battery" />-->
    </template>
    <template v-if="isShowLogin">
      <div class="login-box">
        <a-avatar :size="128">
          <template v-slot:icon>
            <user-outlined/>
          </template>
        </a-avatar>
        <div class="username">{{ loginForm.username }}</div>
        <a-input-search
            v-model:value="loginForm.password"
            type="password"
            autofocus
            placeholder="请输入登录密码"
            size="large"
            @search="onLogin"
        >
          <template v-slot:enterButton>
            <LoadingOutlined  v-if="loginLoading"/>
            <arrow-right-outlined v-else />
          </template>
        </a-input-search>
        <a style="margin-top: 10px" @click="nav2login">重新登录</a>
      </div>
    </template>
    <template v-if="!isShowLogin">
      <div class="local-time">
        <div class="time">
          {{ hour }}:{{ minute }}
        </div>
        <div class="date">
          {{ month }}月{{ day }}号，星期{{ week }}
        </div>
      </div>
      <div class="computer-status">
      <span :class="{offline: !online}" class="network">
        <wifi-outlined class="network"/>
      </span>
        <api-outlined/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, computed} from 'vue'
import {Avatar, message} from 'ant-design-vue'
import {
  LockOutlined,
  LoadingOutlined,
  UnlockOutlined,
  UserOutlined,
  ApiOutlined,
  ArrowRightOutlined,
  WifiOutlined
} from '@ant-design/icons-vue'

import {useRouter, useRoute} from "vue-router";
import {useOnline} from '@/hooks/useOnline'
import {useTime} from '@/hooks/useTime'
import {login} from "@/api/system/user";
// import md5 from 'blueimp-md5'
import HuaweiCharge from './huawei-charge.vue'
import XiaomiCharge from './xiaomi-charge.vue'
import {useBattery} from '@/hooks/useBattery'
import {useStore} from "vuex";

export default defineComponent({
  name: "lockscreen",
  components: {
    LockOutlined,
    LoadingOutlined,
    UnlockOutlined,
    UserOutlined,
    ArrowRightOutlined,
    ApiOutlined,
    WifiOutlined,
    [Avatar.name]: Avatar,
    HuaweiCharge, XiaomiCharge
  },
  setup(props, {emit}) {
    const store = useStore()
    const isLock = computed(() => store.state.lockscreen.isLock)
    // 获取本地时间
    const {month, day, hour, minute, second, week} = useTime()
    const {online} = useOnline()

    const router = useRouter()
    const route = useRoute()

    const {battery, batteryStatus, calcDischargingTime} = useBattery()

    const state = reactive({
      isShowLogin: false,
      loginLoading: false, // 正在登录
      loginForm: {
        username: store.getters.userInfo.username,
        password: '',
      }
    })

    // 解锁登录
    const unLockLogin = (val: boolean) => state.isShowLogin = val

    // 登录
    const onLogin = async () => {
      if (state.loginForm.password.trim() == '') return message.warn('请填写密码')
      const params = {...state.loginForm}
      state.loginLoading = true
      // params.password = md5(params.password)
      const result = await login(params)
      if (result.code == 0) {
        message.success('登录成功！')
        unLockLogin(false)
        store.commit('lockscreen/setLock', false)
      } else {
        message.info(result.message || '登录失败')
      }
      state.loginLoading = false
    }

    const nav2login = () => {
      unLockLogin(false)
      store.commit('lockscreen/setLock', false)
      router.replace({
        path: '/login',
        query: {
          redirect: route.fullPath
        }
      })
    }

    return {
      ...toRefs(state),
      online,
      month, day, hour, minute, second, week,
      battery,
      batteryStatus,
      calcDischargingTime,
      unLockLogin,
      onLogin,
      nav2login
    }
  }
})
</script>

<style lang="scss" scoped>
.lockscreen {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  background: #000;
  color: white;
  overflow: hidden;
  z-index: 9999;

  &.unLockLogin {
    background-color: rgba(25, 28, 34, 0.88);
    backdrop-filter: blur(7px);
  }

  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > * {
      margin-bottom: 14px;
    }

    .username {
      font-size: 30px;
    }
  }

  .lock-box {
    position: absolute;
    top: 12vh;
    left: 50%;
    transform: translateX(-50%);
    font-size: 34px;

    .tips {
      color: white;
      cursor: text;
    }

    .lock {
      display: flex;
      justify-content: center;

      .lock-icon {
        cursor: pointer;

        .anticon-unlock {
          display: none;
        }

        &:hover .anticon-unlock {
          display: initial;
        }

        &:hover .anticon-lock {
          display: none;
        }
      }
    }
  }


  .local-time {
    position: absolute;
    bottom: 60px;
    left: 60px;
    font-family: helvetica;

    .time {
      font-size: 70px;
    }

    .date {
      font-size: 40px;
    }
  }

  .computer-status {
    position: absolute;
    bottom: 60px;
    right: 60px;
    font-size: 24px;

    > * {
      margin-left: 14px;
    }

    .network {
      position: relative;

      &.offline::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2px;
        height: 28px;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: red;
        z-index: 10;
      }
    }
  }
}

</style>
