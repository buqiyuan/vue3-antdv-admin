<template>
  <div>
    <a-alert
        message="自定义图标"
        description="使用阿里图标库，可以有效减小项目的体积，支持离线本地图标和在线图标"
        type="info"
        show-icon
        style="margin-bottom: 12px"
    />
    <a-card>
      示意图：<img @click="showPreview" class="image-demo" src="http://ww1.sinaimg.cn/large/005IOlAWgy1gl8bm4ot9dj314r0opabq.jpg">
      <preview-modal v-if="visible" type="image" v-model:visible="visible" :url="imageUrl" />
      <a-form>
        <a-form-item label="阿里图标路径">
          <a-input v-model:value="scriptUrl" style="width: 400px" placeholder="请输入你的阿里巴巴矢量图标库项目图标的路径"/> (例如：//at.alicdn.com/t/font_1166867_7zdsgx6x88l.js)
        </a-form-item>
        <a-form-item label="图标名字">
          <a-input v-model:value="iconName" placeholder="请输入图标的名字" style="width: 200px"/> （例如：icon-huanfu1、icon-zhutipifu、icon-xinwendongtai1）
        </a-form-item>
        <a-form-item label="效果">
          <icon-font v-if="scriptUrl && iconName" :script-url="scriptUrl" :type="iconName" size="30" />
          <span v-else>可以复制示例的地址和图标查看效果</span>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {Alert,} from 'ant-design-vue'
import {IconFont} from '@/components/iconfont'
import PreviewModal from '@/components/preview-modal.vue'

/**
 * @description ant-design-vue配置阿里巴巴矢量图标库使用
 */
export default defineComponent({
  name: "custom-modal",
  components: { [Alert.name]: Alert, IconFont, PreviewModal},
  setup() {
    const state = reactive({
      scriptUrl: '',
      iconName: '',
      visible: false,
      imageUrl: ''
    })

    const showPreview = (e) => {
      state.imageUrl = e.target.currentSrc
      state.visible = true
    }

    return {
      ...toRefs(state),
      showPreview
    }
  }
})
</script>

<style lang="scss" scoped>
.image-demo {
  width: 600px;
  height: 400px;
  margin-bottom: 12px;
}
</style>
