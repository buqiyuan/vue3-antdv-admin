<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';

  defineOptions({
    name: 'LayoutBreadcrumb',
  });

  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();

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
  const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name);

  // 点击菜单
  const clickMenuItem = (menuItem: RouteRecordRaw) => {
    const lastChild = findLastChild(menuItem);
    console.log('lastChild', menuItem, lastChild);

    const targetRoute = getRouteByName(lastChild?.name);
    const { isExt, extOpenMode } = targetRoute?.meta || {};
    if (isExt && extOpenMode === 1) {
      window.open(lastChild?.path);
    } else {
      router.push({ name: lastChild?.name });
    }
  };

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

  const getSelectKeys = (rotueIndex: number) => {
    return [menus.value[rotueIndex + 1]?.name] as string[];
  };
</script>

<template>
  <a-breadcrumb>
    <template v-for="(routeItem, rotueIndex) in menus" :key="routeItem?.name">
      <a-breadcrumb-item>
        <TitleI18n :title="routeItem?.meta?.title" />
        <template v-if="routeItem?.children?.length" #overlay>
          <a-menu :selected-keys="getSelectKeys(rotueIndex)">
            <template v-for="childItem in routeItem?.children" :key="childItem.name">
              <a-menu-item
                v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb"
                :key="childItem.name"
                @click="clickMenuItem(childItem)"
              >
                <TitleI18n :title="childItem.meta?.title" />
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<style lang="less" scoped></style>
