<template>
  <a-card class="h-full">
    <a-typography-title :level="3">{{ $route.fullPath }}</a-typography-title>
    <Tabs :activeKey="activeKey" type="card" @tabClick="handleTabClick">
      <Tabs.TabPane v-for="item in tabs" :key="item.name" :tab="item.title" />
    </Tabs>
    <router-view #="{ Component }">
      <KeepAlive>
        <component :is="Component" :key="$route.fullPath" />
      </KeepAlive>
    </router-view>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Tabs } from 'ant-design-vue';

  defineOptions({
    name: 'DemosNestedRoutes',
  });

  const router = useRouter();
  const route = useRoute();

  const tabs = [
    {
      title: '路由一',
      name: 'demos-nested-routes-one',
    },
    {
      title: '路由二',
      name: 'demos-nested-routes-two',
    },
    {
      title: '路由三',
      name: 'demos-nested-routes-three',
    },
  ];

  const activeKey = ref();

  const handleTabClick = (key) => {
    activeKey.value = key;
    router.push({ name: key });
  };

  watch(
    () => route.name,
    (val: string) => {
      activeKey.value = val;
    },
    {
      immediate: true,
    },
  );
</script>
