<template>
  <Layout.Header class="layout-header">
    <Space :size="20">
      <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
        <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
      </span>
      <Breadcrumb>
        <template v-for="(routeItem, rotueIndex) in menus" :key="routeItem.name">
          <Breadcrumb.Item>
            <TitleI18n :title="routeItem?.meta?.title" />
            <template v-if="routeItem?.children?.length" #overlay>
              <Menu :selectedKeys="[menus[rotueIndex + 1]?.name]">
                <template v-for="childItem in routeItem?.children" :key="childItem.name">
                  <Menu.Item
                    v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb"
                    :key="childItem.name"
                    @click="clickMenuItem(childItem)"
                  >
                    <TitleI18n :title="childItem.meta?.title" />
                  </Menu.Item>
                </template>
              </Menu>
            </template>
          </Breadcrumb.Item>
        </template>
      </Breadcrumb>
    </Space>
    <Space :size="20">
      <Search />
      <Tooltip :title="$t('layout.header.tooltipLock')" placement="bottom">
        <LockOutlined @click="lockscreenStore.setLock(true)" />
      </Tooltip>
      <FullScreen />
      <LocalePicker />
      <Dropdown>
        <Avatar :src="userInfo.headImg" :alt="userInfo.name">{{ userInfo.name }}</Avatar>
        <template #overlay>
          <Menu>
            <Menu.Item>
              <div>个人中心</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <div @click.prevent="doLogout">
                <poweroff-outlined /> {{ $t('layout.header.dropdownItemLoginOut') }}
              </div>
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
      <SettingOutlined />
    </Space>
  </Layout.Header>
</template>

<script lang="tsx" setup>
  import { computed } from 'vue';
  import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
  import {
    Layout,
    message,
    Modal,
    Dropdown,
    Menu,
    Space,
    Breadcrumb,
    Avatar,
    Tooltip,
  } from 'ant-design-vue';
  import {
    QuestionCircleOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
    LockOutlined,
  } from '@ant-design/icons-vue';
  import { Search, FullScreen } from './components';
  import { LocalePicker } from '@/components/basic/locale-picker';
  import { useUserStore } from '@/store/modules/user';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { LOGIN_NAME } from '@/router/constant';
  import { TitleI18n } from '@/components/basic/title-i18n';

  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
  const emit = defineEmits(['update:collapsed']);
  const userStore = useUserStore();
  const lockscreenStore = useLockscreenStore();

  const router = useRouter();
  const route = useRoute();
  const userInfo = computed(() => userStore.userInfo);

  const menus = computed(() => {
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
          name: LOGIN_NAME,
          query: {
            redirect: route.fullPath,
          },
        });
      },
    });
  };
</script>

<style lang="less" scoped>
  .layout-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    height: @header-height;
    padding: 0 20px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    * {
      cursor: pointer;
    }
  }
</style>
