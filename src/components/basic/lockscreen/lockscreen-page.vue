<template>
  <div
    :class="{ unLockLogin: state.isShowLogin || !state.hasLockPassword }"
    class="lockscreen"
    @keyup="unLockLogin(true)"
    @mousedown.stop
    @contextmenu.prevent
  >
    <template v-if="!state.hasLockPassword">
      <div class="setting-box">
        <div>设置临时锁屏密码</div>
        <Avatar :size="128">
          <template #icon>
            <user-outlined />
          </template>
        </Avatar>
        <div class="username">{{ state.loginForm.username }}</div>
        <a-input-password
          v-model:value="state.temLockPassword"
          placeholder="请输入锁屏密码"
          size="large"
          autofocus
        />
        <div class="btn-list">
          <a-button type="dashed" @click="unlockScreen">取消</a-button>
          <a-button type="primary" :disabled="state.temLockPassword?false:true" @click="lockScreen">确定锁屏</a-button>
        </div>
      </div>
    </template>
    <template v-else-if="!state.isShowLogin">
      <div class="lock-box">
        <div class="lock">
          <span class="lock-icon" title="解锁屏幕" @click="unLockLogin(true)">
            <lock-outlined />
            <unlock-outlined />
          </span>
        </div>
        <h6 class="tips">点击解锁</h6>
      </div>
      <!-- 小米 / 华为 充电-->
      <component
        :is="randomCompName"
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
      />
      <div class="local-time">
        <div class="time">{{ hour }}:{{ minute }}</div>
        <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
      </div>
      <div class="computer-status">
        <span :class="{ offline: !online }" class="network">
          <WifiOutlined class="network" />
        </span>
        <ApiOutlined />
      </div>
    </template>
    <template v-else>
      <div class="login-box">
        <Avatar :size="128">
          <template #icon>
            <user-outlined />
          </template>
        </Avatar>
        <div class="username">{{ state.loginForm.username }}</div>
        <a-input-search
          v-model:value="state.loginForm.password"
          type="password"
          autofocus
          placeholder="请输入登录密码"
          size="large"
          @search="onLogin"
        >
          <template #enterButton>
            <LoadingOutlined v-if="state.loginLoading" />
            <arrow-right-outlined v-else />
          </template>
        </a-input-search>
        <a style="margin-top: 10px" @click="nav2login">重新登录</a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import {
    LockOutlined,
    LoadingOutlined,
    UnlockOutlined,
    UserOutlined,
    ApiOutlined,
    ArrowRightOutlined,
    WifiOutlined,
  } from '@ant-design/icons-vue';

  import { useRouter, useRoute } from 'vue-router';
  import { Avatar, message } from 'ant-design-vue';
  import HuaweiCharge from './huawei-charge.vue';
  import XiaomiCharge from './xiaomi-charge.vue';
  import { useOnline } from '@/hooks/useOnline';
  import { useTime } from '@/hooks/useTime';
  import md5 from 'md5'
  import { useBattery } from '@/hooks/useBattery';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { useUserStore } from '@/store/modules/user';
  import { LOGIN_NAME } from '@/router/constant';

  const lockscreenStore = useLockscreenStore();
  const userStore = useUserStore();
  // const isLock = computed(() => lockscreenStore.isLock);
  // 获取本地时间
  const { month, day, hour, minute, week } = useTime();
  const { online } = useOnline();

  const router = useRouter();
  const route = useRoute();

  const { battery, batteryStatus, calcDischargingTime } = useBattery();

  const randomCompName = Math.random() > 0.49 ? XiaomiCharge : HuaweiCharge;

  const state = reactive({
    isShowLogin: false,
    loginLoading: false, // 正在登录
    loginForm: {
      username: userStore.name,
      password: '',
    },
    temLockPassword: '',
    hasLockPassword: userStore.getLockPwd() ? true : false, // 是否有锁屏密码 默认没有
  });

  // 解锁登录
  const unLockLogin = (val: boolean) => (state.isShowLogin = val);

  // 登录
  const onLogin = async () => {
    if (state.loginForm.password.trim() == '') return message.warn('请填写密码');
    const newPwd = md5(state.loginForm.password);
    const lockPwd = userStore.getLockPwd();
    if (newPwd === lockPwd) {
      unlockScreen()
    } else {
      return message.warn('请填写正确的锁屏密码');
    }
  };
  // 取消锁屏/解锁锁屏
  const unlockScreen = () => {
    unLockLogin(false);
    lockscreenStore.setLock(false);
    userStore.setLockPwd('');
  };
  // 输入密码 锁屏
  const lockScreen = () => {
    if (!state.temLockPassword) return;
    userStore.setLockPwd(md5(state.temLockPassword));
    console.log(state.temLockPassword, 'temLockPassword');
    state.hasLockPassword = true;
    state.isShowLogin = false;
  };
  const nav2login = () => {
    unLockLogin(false);
    lockscreenStore.setLock(false);
    router.replace({
      name: LOGIN_NAME,
      query: {
        redirect: route.fullPath,
      },
    });
  };
</script>

<style lang="less" scoped>
  .lockscreen {
    display: flex;
    position: fixed;
    z-index: 9999;
    inset: 0;
    overflow: hidden;
    background: #000;
    color: white;

    &.unLockLogin {
      background-color: rgb(25 28 34 / 78%);
      backdrop-filter: blur(7px);
    }

    .setting-box,.login-box {
      display: flex;
      position: absolute;
      top: 45%;
      left: 50%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);

      > * {
        margin-bottom: 14px;
      }

      .username {
        font-size: 30px;
      }
      .btn-list{
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
      }
      /deep/.ant-btn-primary:disabled{
        color: #fff;
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
      right: 60px;
      bottom: 60px;
      font-size: 24px;

      > * {
        margin-left: 14px;
      }

      .network {
        position: relative;

        &.offline::before {
          content: '';
          position: absolute;
          z-index: 10;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 28px;
          transform: translate(-50%, -50%) rotate(45deg);
          background-color: red;
        }
      }
    }
  }
</style>
