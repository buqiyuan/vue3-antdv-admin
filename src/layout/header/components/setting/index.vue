<template>
  <div ref="settingRef">
    <SettingOutlined @click="showDrawer" />
    <Drawer
      v-model:visible="visible"
      placement="right"
      :closable="false"
      :get-container="() => settingRef"
    >
      <Descriptions title="整体风格" :column="5">
        <Descriptions.Item v-for="theme in themeList" :key="theme">
          <div
            class="style-checbox-item"
            :class="{ active: themeStore.navTheme === theme }"
            @click="setTheme(theme)"
          >
            <img :src="getImageUrl(theme)" />
          </div>
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="主题色" :column="9">
        <Descriptions.Item v-for="item in themeColors" :key="item.key">
          <div class="style-checbox-item">
            <Tooltip :title="item.title">
              <Tag :color="item.value" @click="setThemeColor({ primaryColor: item.value })">
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
                  @input="setThemeColor({ primaryColor: customColor })"
                />
                <span :style="{ visibility: getThemeColorVisible(customColor) }"> ✔ </span>
              </Tag>
            </Tooltip>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { Drawer, Descriptions, Tag, Tooltip } from 'ant-design-vue';
  import type { ThemeName, Theme } from '@/store/modules/projectConfig';
  import { useThemeStore, themeList } from '@/store/modules/projectConfig';

  defineOptions({
    name: 'ProjectSetting',
  });

  const themeColors = [
    {
      title: '拂晓蓝（默认）',
      key: 'daybreak',
      value: 'rgb(24, 144, 255)',
    },
    {
      title: '薄暮',
      key: 'dust',
      value: 'rgb(245, 34, 45)',
    },
    {
      title: '火山',
      key: 'volcano',
      value: 'rgb(250, 84, 28)',
    },
    {
      title: '日暮',
      key: 'sunset',
      value: 'rgb(250, 173, 20)',
    },
    {
      title: '明青',
      key: 'cyan',
      value: 'rgb(19, 194, 194)',
    },
    {
      title: '极光绿',
      key: 'green',
      value: 'rgb(82, 196, 26)',
    },
    {
      title: '极客蓝',
      key: 'geekblue',
      value: 'rgb(47, 84, 235)',
    },
    {
      title: '酱紫',
      key: 'purple',
      value: 'rgb(114, 46, 209)',
    },
  ];

  const themeStore = useThemeStore();
  const settingRef = ref();
  const customColor = ref(themeStore.primaryColor);
  const visible = ref(false);

  const setTheme = (theme: ThemeName) => {
    themeStore.setTheme({ navTheme: theme });
  };

  const setThemeColor = ({ primaryColor }: Theme) => {
    themeStore.fillColor({ primaryColor });
  };

  const getThemeColorVisible = (color) =>
    themeStore.primaryColor === color ? 'visible' : 'hidden';

  const getImageUrl = (theme: ThemeName) => {
    return new URL(`/src/assets/icons/${theme}.svg`, import.meta.url).href;
  };

  const showDrawer = () => {
    visible.value = true;
  };
</script>

<style lang="less" scoped>
  .style-checbox-item {
    position: relative;
    cursor: pointer;

    &.active:after {
      content: '✔';
      position: absolute;
      bottom: 5px;
      right: 12px;
      color: @primary-color;
    }
  }

  input[type='color'] {
    width: 40px;
    height: 40px;
    border: 0;
    padding: 0;
    outline: none;
    -webkit-appearance: none;

    &::-webkit-color-swatch-wrapper {
      background: v-bind(customColor);
    }

    &::-webkit-color-swatch {
      display: none;
    }
  }
</style>
