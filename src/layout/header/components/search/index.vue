<template>
  <CustomAModal title="搜索菜单" v-model:visible="show" :keyboard="false">
    <a-input
      ref="inputRef"
      v-model:value="keyword"
      clearable
      placeholder="请输入关键词搜索"
      @change="handleSearch"
    >
      <template #prefix>
        <SearchOutlined class="text-15px text-[#c2c2c2]" />
      </template>
    </a-input>
    <div class="mt-20px">
      <Empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
      <search-result
        v-else
        v-model:value="activePath"
        :options="resultOptions"
        @enter="handleEnter"
      />
    </div>
    <template #footer>
      <search-footer />
    </template>
  </CustomAModal>
</template>

<script lang="ts" setup>
  import { ref, shallowRef, computed, watch, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import type { RouteRecordRaw } from 'vue-router';
  import { Empty } from 'ant-design-vue';
  import { CustomAModal } from '@/components/a-custom-modal';
  import { useDebounceFn, onKeyStroke } from '@vueuse/core';
  import { useUserStore } from '@/store/modules/user';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import SearchResult from './components/SearchResult.vue';
  import SearchFooter from './components/SearchFooter.vue';

  interface Props {
    /** 弹窗显隐 */
    value: boolean;
  }

  interface Emits {
    (e: 'update:value', val: boolean): void;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emits>();

  const userStore = useUserStore();
  const router = useRouter();
  const keyword = ref('');
  const activePath = ref('');
  const menusList = computed(() => transformRouteToList(userStore.menus));
  const resultOptions = shallowRef<RouteRecordRaw[]>([]);
  const inputRef = ref<HTMLInputElement | null>(null);
  const handleSearch = useDebounceFn(search, 300);

  const show = computed({
    get() {
      return props.value;
    },
    set(val: boolean) {
      emit('update:value', val);
    },
  });

  watch(show, async (val) => {
    if (val) {
      /** 自动聚焦 */
      await nextTick();
      inputRef.value?.focus();
    }
  });
  /** 查询 */
  function search() {
    resultOptions.value = menusList.value.filter((menu) => {
      const title = menu.meta?.title as string;
      return keyword.value && title.includes(keyword.value.trim());
    });
    if (resultOptions.value?.length > 0) {
      activePath.value = resultOptions.value[0].name as string;
    } else {
      activePath.value = '';
    }
  }
  /** 将路由转换成菜单列表 */
  function transformRouteToList(routes: RouteRecordRaw[], treeMap: RouteRecordRaw[] = []) {
    if (routes && routes.length === 0) return [];
    return routes.reduce((acc, cur) => {
      /** 允许在菜单内显示并且无子路由 */
      if (!cur.meta?.hideInMenu && !cur.children) {
        acc.push(cur);
      }
      if (cur.children && cur.children.length > 0) {
        transformRouteToList(cur.children, treeMap);
      }
      return acc;
    }, treeMap);
  }

  function handleClose() {
    resultOptions.value = [];
    keyword.value = '';
    show.value = false;
  }

  /** key up */
  function handleUp() {
    const { length } = resultOptions.value;
    if (length === 0) return;
    const index = resultOptions.value.findIndex((item) => item.name === activePath.value);
    if (index === 0) {
      activePath.value = resultOptions.value[length - 1].name as string;
    } else {
      activePath.value = resultOptions.value[index - 1].name as string;
    }
  }

  /** key down */
  function handleDown() {
    const { length } = resultOptions.value;
    if (length === 0) return;
    const index = resultOptions.value.findIndex((item) => item.name === activePath.value);
    if (index + 1 === length) {
      activePath.value = resultOptions.value[0].name as string;
    } else {
      activePath.value = resultOptions.value[index + 1].name as string;
    }
  }

  /** key enter */
  function handleEnter() {
    if (/http(s)?:/.test(activePath.value)) {
      window.open(activePath.value);
    } else {
      router.push({ name: activePath.value });
      handleClose();
    }
  }

  onKeyStroke('Escape', handleClose);
  onKeyStroke('Enter', handleEnter);
  onKeyStroke('ArrowUp', handleUp);
  onKeyStroke('ArrowDown', handleDown);
</script>
<style lang="less" scoped></style>
