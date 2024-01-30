<template>
  <Dropdown placement="bottomRight">
    <SvgIcon name="locale" />
    <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    <template #overlay>
      <Menu v-model:selectedKeys="selectedKeys" @click="handleMenuClick">
        <Menu.Item v-for="item in localeList" :key="item.lang">
          <a href="javascript:;">{{ item.icon }} {{ item.label }}</a>
        </Menu.Item>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, unref, computed } from 'vue';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { useLocale } from '@/locales/useLocale';
  import { type LocaleType, localeList } from '@/locales/config';
  import { SvgIcon } from '@/components/basic/icon';

  const props = defineProps({
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: true },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
  });

  const selectedKeys = ref<string[]>([]);

  const { changeLocale, getLocale } = useLocale();

  const getLocaleText = computed(() => {
    const key = selectedKeys.value[0];
    if (!key) {
      return '';
    }
    return localeList.find((item) => item.lang === key)?.label;
  });

  watchEffect(() => {
    selectedKeys.value = [unref(getLocale)];
  });

  async function toggleLocale(lang: LocaleType | string) {
    await changeLocale(lang as LocaleType);
    selectedKeys.value = [lang as string];
    props.reload && location.reload();
  }

  function handleMenuClick({ key }) {
    if (unref(getLocale) === key) {
      return;
    }
    toggleLocale(key as string);
  }
</script>
