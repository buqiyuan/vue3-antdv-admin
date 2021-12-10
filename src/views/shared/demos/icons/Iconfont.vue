<template>
  <div>
    <Alert
      message="自定义图标"
      description="使用阿里图标库，可以有效减小项目的体积，支持离线本地图标和在线图标"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <a-card>
      示意图：<img
        class="image-demo"
        src="http://ww1.sinaimg.cn/large/005IOlAWgy1gl8bm4ot9dj314r0opabq.jpg"
        @click="showPreview"
      />
      <preview-modal
        v-if="state.visible"
        v-model:visible="state.visible"
        type="image"
        :url="state.imageUrl"
      />
      <Descriptions title="使用示例" :column="1">
        <Descriptions.Item label="阿里图标路径">
          <a-input
            v-model:value="state.scriptUrl"
            style="width: 400px"
            placeholder="请输入你的阿里巴巴矢量图标库项目图标的路径"
          />
          (例如：//at.alicdn.com/t/font_1166867_7zdsgx6x88l.js)
        </Descriptions.Item>
        <Descriptions.Item label="图标名字">
          <a-input
            v-model:value="state.iconName"
            placeholder="请输入图标的名字"
            style="width: 200px"
          />
          （例如：icon-huanfu1、icon-zhutipifu、icon-xinwendongtai1）
        </Descriptions.Item>
        <Descriptions.Item label="效果">
          <icon-font
            v-if="state.scriptUrl && state.iconName"
            :script-url="state.scriptUrl"
            :type="state.iconName"
            size="30"
          />
          <span v-else>可以复制示例的地址和图标查看效果</span>
        </Descriptions.Item>
      </Descriptions>
    </a-card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomIcon',
  };
</script>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Alert, Descriptions } from 'ant-design-vue';
  import { IconFont } from '@/components/iconfont';
  import PreviewModal from '@/components/preview-modal.vue';

  /**
   * @description ant-design-vue配置阿里巴巴矢量图标库使用
   */
  const state = reactive({
    scriptUrl: '',
    iconName: '',
    visible: false,
    imageUrl: '',
  });

  const showPreview = (e) => {
    state.imageUrl = e.target.currentSrc;
    state.visible = true;
  };
</script>

<style lang="less" scoped>
  .image-demo {
    width: 600px;
    height: 400px;
    margin-bottom: 12px;
  }
</style>
