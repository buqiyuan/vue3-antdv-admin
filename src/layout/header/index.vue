<template>
  <Layout.Header class="layout-header">
    <div class="left-options">
      <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
        <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
      </span>
      <Breadcrumb>
        <template v-for="(routeItem, rotueIndex) in menus" :key="routeItem.name">
          <Breadcrumb.Item>
            <span>{{ getTitle(routeItem?.meta?.title) }}</span>
            <template v-if="routeItem?.children?.length" #overlay>
              <Menu :selectedKeys="[menus[rotueIndex + 1]?.name]">
                <template v-for="childItem in routeItem?.children" :key="childItem.name">
                  <Menu.Item
                    v-if="!childItem.meta?.hideInMenu"
                    :key="childItem.name"
                    @click="clickMenuItem(childItem)"
                  >
                    <span>{{ getTitle(childItem.meta?.title) }}</span>
                  </Menu.Item>
                </template>
              </Menu>
            </template>
          </Breadcrumb.Item>
        </template>
      </Breadcrumb>
    </div>
    <div class="right-options">
      <template v-for="item in iconList" :key="item.icon.name">
        <Tooltip placement="bottom">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          <component :is="item.icon" v-on="item.eventObject || {}" />
        </Tooltip>
      </template>
      <!--      切换全屏-->
      <component :is="fullscreenIcon" @click="toggleFullScreen" />
      <Dropdown>
        <Avatar :src="userInfo.headImg" :alt="userInfo.name">{{ userInfo.name }}</Avatar>
        <template #overlay>
          <Menu>
            <Menu.Item>
              <div>个人中心</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <div @click.prevent="doLogout"><poweroff-outlined /> 退出登录</div>
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </Layout.Header>
</template>

<script lang="tsx" setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
  import {
    Layout,
    message,
    Modal,
    Dropdown,
    Menu,
    Tooltip,
    Breadcrumb,
    Avatar,
  } from 'ant-design-vue';
  import {
    QuestionCircleOutlined,
    SettingOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    PoweroffOutlined,
    GithubOutlined,
    LockOutlined,
  } from '@ant-design/icons-vue';
  import { useUserStore } from '@/store/modules/user';
  import { useLockscreenStore } from '@/store/modules/lockscreen';

  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
  const emit = defineEmits(['update:collapsed']);

  const userStore = useUserStore();
  const lockscreenStore = useLockscreenStore();
  const fullscreenIcon = ref(FullscreenOutlined);

  const router = useRouter();
  const route = useRoute();
  const userInfo = computed(() => userStore.userInfo);
  const menus = computed(() => {
    console.log('route', route, userStore.menus);
    if (route.meta?.namePath) {
      let children = userStore.menus;
      const paths = route.meta?.namePath?.map((item) => {
        const a = children.find((n) => n.name === item);
        children = a?.children || [];
        return a;
      });
      return [
        {
          name: '__index',
          meta: {
            title: '首页',
          },
          children: userStore.menus,
        },
        ...paths,
      ];
    }
    return route.matched;
  });

  const findLastChild = (route?: RouteRecordRaw) => {
    if (typeof route?.redirect === 'object') {
      const redirectValues = Object.values(route.redirect);
      if (route?.children?.length) {
        const target = route.children.find((n) =>
          redirectValues.some((m) => [n.name, n.path, n.meta?.fullPath].some((v) => v === m)),
        );
        return findLastChild(target);
      }
      return redirectValues.find((n) => typeof n === 'string');
    } else if (typeof route?.redirect === 'string') {
      if (route?.children?.length) {
        const target = route.children.find((n) =>
          [n.name, n.path, n.meta?.fullPath].some((m) => m === route?.redirect),
        );
        return findLastChild(target);
      }
      return route?.redirect;
    }
    return route;
  };

  // 点击菜单
  const clickMenuItem = (menuItem: RouteRecordRaw) => {
    const lastChild = findLastChild(menuItem);
    console.log('lastChild', menuItem, lastChild);

    if (lastChild?.name === route.name) return;
    if (/http(s)?:/.test(lastChild?.name)) {
      window.open(lastChild?.name);
    } else if (lastChild?.name) {
      router.push({ name: lastChild.name });
    }
  };

  // 退出登录
  const doLogout = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        // 如果不是rootadmin，则退出登录
        if (userStore.userInfo.phone !== '13553550634') {
          // logout({})
          await userStore.logout();
        }
        message.success('成功退出登录');
        // 移除标签页
        localStorage.clear();
        router.replace({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        });
      },
    });
  };

  // 切换全屏图标
  const toggleFullscreenIcon = () => {
    fullscreenIcon.value =
      document.fullscreenElement !== null ? FullscreenExitOutlined : FullscreenOutlined;
  };

  // 监听全屏切换事件
  document.addEventListener('fullscreenchange', toggleFullscreenIcon);

  // 全屏切换
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // 图标列表
  const iconList = [
    {
      icon: SearchOutlined,
      tips: '搜索',
    },
    {
      icon: GithubOutlined,
      tips: 'github',
      eventObject: {
        click: () => window.open('https://github.com/buqiyuan/vue3-antd-admin'),
      },
    },
    {
      icon: SettingOutlined,
      tips: '网站设置',
    },
    {
      icon: LockOutlined,
      tips: '锁屏',
      eventObject: {
        click: () => lockscreenStore.setLock(true),
      },
    },
  ];
  const getTitle = (title) => {
    return typeof title === 'string' ? title : title?.['zh_CN'];
  };
</script>

<style lang="less" scoped>
  .layout-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    height: @header-height;
    padding: 0;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;

    .left-options {
      display: flex;
      align-items: center;

      .menu-fold {
        padding: 0 24px;
        cursor: pointer;
      }
    }

    .right-options {
      display: flex;
      align-items: center;

      > * {
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
</style>
