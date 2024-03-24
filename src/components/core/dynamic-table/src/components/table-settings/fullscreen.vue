<script setup lang="ts">
  import { ref, getCurrentInstance } from 'vue';
  import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  const table = useTableContext();
  const isFullscreen = table.isFullscreen;
  const currentInstance = getCurrentInstance();
  const open = ref(false);

  const updateAppContainerStyle = () => {
    const appEl: HTMLDivElement =
      currentInstance?.appContext.app._container || document.querySelector('#app');

    appEl.style.setProperty('opacity', isFullscreen.value ? '0' : '1');
    appEl.style.setProperty('visibility', isFullscreen.value ? 'hidden' : 'visible');
    appEl.style.setProperty('position', isFullscreen.value ? 'absolute' : 'relative');
  };

  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
    open.value = false;
    updateAppContainerStyle();
  };
</script>

<template>
  <a-tooltip v-model:open="open" placement="top">
    <template #title>
      {{ isFullscreen ? '取消全屏' : '全屏' }}
    </template>
    <component
      :is="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined"
      @click="toggleFullscreen"
    />
  </a-tooltip>
</template>
