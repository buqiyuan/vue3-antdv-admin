<template>
  <SettingOutlined @click="showDrawer" />
  <Drawer v-model:open="visible" placement="right" :closable="false">
    <Descriptions title="整体风格" :column="5">
      <Descriptions.Item v-for="theme in themeStyle" :key="theme.value">
        <Tooltip :title="theme.label">
          <div
            class="style-checbox-item"
            :class="{ active: layoutSetting.navTheme === theme.value }"
            @click="setNavTheme(theme.value)"
          >
            <svg-icon :name="theme.value" size="50" />
          </div>
        </Tooltip>
      </Descriptions.Item>
    </Descriptions>
    <Descriptions title="主题色" :column="9">
      <Descriptions.Item v-for="item in themeColors" :key="item.key">
        <div class="style-checbox-item">
          <Tooltip :title="item.title">
            <Tag :color="item.value" @click="setThemeColor(item.value)">
              <span :style="{ visibility: getThemeColorVisible(item.value) }"> ✔ </span>
            </Tag>
          </Tooltip>
        </div>
      </Descriptions.Item>
      <Descriptions.Item key="custom">
        <div class="style-checbox-item">
          <Tooltip title="自定义">
            <Tag :color="customColor" class="relative overflow-hidden">
              <input
                v-model="customColor"
                type="color"
                class="absolute inset-0"
                :style="colorPickerStyle"
                @input="setThemeColor(customColor!)"
              />
              <span :style="{ visibility: getThemeColorVisible(customColor) }"> ✔ </span>
            </Tag>
          </Tooltip>
        </div>
      </Descriptions.Item>
    </Descriptions>
    <Descriptions title="导航模式" :column="5">
      <Descriptions.Item v-for="item in layouts" :key="item.value">
        <div
          class="style-checbox-item"
          :class="{ active: layoutSetting.layout === item.value }"
          @click="setLayout(item.value)"
        >
          <svg-icon :name="item.value" size="50" />
        </div>
      </Descriptions.Item>
    </Descriptions>
    <Descriptions title="页面显示" :column="1">
      <Descriptions.Item v-for="item in uiSettings" :key="item.value">
        <a-flex justify="space-between" class="w-full">
          {{ item.label }}
          <a-switch
            v-model:checked="layoutSetting[item.value]"
            checked-children="开"
            un-checked-children="关"
          />
        </a-flex>
      </Descriptions.Item>
    </Descriptions>
  </Drawer>
</template>

<script lang="ts" setup>
  import { ref, computed, type StyleValue } from 'vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { Drawer, Descriptions, Tag, Tooltip } from 'ant-design-vue';
  import { layouts, themeColors, themeStyle, uiSettings } from './constant';
  import type { ThemeColor } from './constant';
  import type { LayoutSetting } from '@/store/modules/layoutSetting';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  defineOptions({
    name: 'ProjectSetting',
  });

  const layoutSettingStore = useLayoutSettingStore();
  const { layoutSetting } = storeToRefs(layoutSettingStore);
  const customColor = ref(layoutSetting.value.colorPrimary);
  const visible = ref(false);

  const colorPickerStyle = computed(() => ({ '--custom-color': customColor.value }) as StyleValue);

  const setNavTheme = (theme: ThemeColor) => {
    layoutSettingStore.updateLayoutSetting({ navTheme: theme });
  };
  const setLayout = (layout: LayoutSetting['layout']) => {
    layoutSettingStore.updateLayoutSetting({ layout });
  };

  const setThemeColor = (colorPrimary: string) => {
    layoutSettingStore.updateLayoutSetting({ colorPrimary });
  };

  const getThemeColorVisible = (color) =>
    layoutSetting.value.colorPrimary === color ? 'visible' : 'hidden';

  // const getImageUrl = (theme: ThemeName) => {
  //   return new URL(`/src/assets/icons/${theme}.svg`, import.meta.url).href;
  // };

  const showDrawer = () => {
    visible.value = true;
  };
</script>

<style lang="less" scoped>
  .style-checbox-item {
    position: relative;
    cursor: pointer;

    &.active::after {
      content: '✔';
      position: absolute;
      right: 12px;
      bottom: 10px;
      color: var(--app-primary-color);
    }
  }

  input[type='color'] {
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    outline: none;
    appearance: none;

    &::-webkit-color-swatch-wrapper {
      background: var(--custom-color);
    }

    &::-webkit-color-swatch {
      display: none;
    }
  }
</style>
