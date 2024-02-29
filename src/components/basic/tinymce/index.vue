<script setup lang="ts">
  import { computed } from 'vue';
  import EditorComp from '@tinymce/tinymce-vue';
  import tinymceUrl from 'tinymce/tinymce.min.js?url';
  import './plugins';
  import langs from './langs/';
  import { tinymceProps, type TinymceEvents } from './props';
  import type { RawEditorOptions } from 'tinymce';

  import { useLocale } from '@/locales/useLocale';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  defineEmits<TinymceEvents>();
  const props = defineProps(tinymceProps);

  const modelValue = defineModel<string>('value');

  const layoutSettingStore = useLayoutSettingStore();

  const langName = computed(() => {
    const lang = useLocale().getLocale.value;
    return ['zh_CN', 'en'].includes(lang) ? lang : 'zh_CN';
  });

  const skinName = computed(() => {
    return layoutSettingStore.getNavTheme === 'realDark' ? 'oxide-dark' : 'oxide';
  });

  const initOptions = computed((): RawEditorOptions => {
    const { height, init, toolbar, plugins } = props;
    const publicPath = import.meta.env.VITE_BASE_URL || '/';
    const baseUrl = `${publicPath}tinymce-resource`;

    return {
      base_url: baseUrl,
      height,
      toolbar,
      menubar: 'file edit insert view format table',
      plugins,
      language_url: langs[langName.value],
      language: langName.value,
      branding: false,
      default_link_target: '_blank',
      link_title: false,
      promotion: false,
      object_resizing: false,
      auto_focus: true,
      resize: true,
      skin: skinName.value,
      skin_url: `${baseUrl}/skins/ui/${skinName.value}`,
      ...init,
    };
  });
</script>

<template>
  <EditorComp
    v-bind="{ ...$attrs, ...props }"
    v-model="modelValue"
    :tinymce-script-src="tinymceUrl"
    :init="initOptions"
  />
</template>

<style scoped></style>
