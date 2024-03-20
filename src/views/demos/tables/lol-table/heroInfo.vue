<template>
  <a-card :bordered="false" :loading="loading">
    <a-card-grid style="width: 25%" :hoverable="false" :bordered="false">
      <a-card class="posters" :bordered="false" :body-style="{ padding: '24px' }">
        <template #cover>
          <a-carousel arrows :dots="false">
            <template #prevArrow>
              <div class="custom-slick-arrow" style="z-index: 1; left: 10px">
                <Icon icon="ant-design:left-circle-outlined" size="28" />
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <Icon icon="ant-design:right-circle-outlined" size="28" />
              </div>
            </template>
            <template v-for="item in heroInfo.posters" :key="item">
              <img :src="item" alt="" />
            </template>
          </a-carousel>
        </template>
        <a-card-meta :title="`${heroInfo.name}  ${heroInfo.title}`">
          <template #description>
            <a
              :href="`https://101.qq.com/#/hero-detail?heroid=${heroInfo.heroId}&datatype=5v5`"
              target="_blank"
            >
              详细资料
            </a>
          </template>
        </a-card-meta>
      </a-card>
    </a-card-grid>
    <a-card-grid class="skins" style="width: 75%" :hoverable="false" :bordered="false">
      <a-carousel arrows effect="fade" dots-class="slick-dots slick-thumb">
        <template #customPaging="props">
          <a>
            <img :src="heroInfo.skins[props.i]" />
          </a>
        </template>
        <div v-for="item in heroInfo.skins" :key="item">
          <img :src="item" />
        </div>
      </a-carousel>
      <figure v-if="heroInfo.banAudio || heroInfo.selectAudio" class="grid gap-[10px]">
        <figcaption>{{ heroInfo.title }}有话说:</figcaption>
        <template v-for="url in [heroInfo.banAudio, heroInfo.selectAudio]" :key="url">
          <audio v-if="url" controls :src="url" />
        </template>
      </figure>
    </a-card-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Icon } from '@/components/basic/icon';
  import { getLolHeroInfo } from '@/api/demo/hero';
  import { useTabsViewStore } from '@/store/modules/tabsView';

  defineOptions({
    name: 'LoLHeroInfo',
  });

  const route = useRoute();
  const tabsViewStore = useTabsViewStore();
  const heroInfo = ref<any>({});
  const loading = ref(true);

  onMounted(async () => {
    const data = await getLolHeroInfo({ id: route.params.id as string });
    loading.value = false;
    heroInfo.value = data;
    tabsViewStore.updateTabTitle(`${route.meta.title}(${heroInfo.value.title})`);
  });
</script>

<style lang="less" scoped>
  .skins :deep(.ant-carousel) {
    .slick-dots {
      position: relative;
      height: auto;
    }

    .slick-slide img {
      display: block;
      max-width: 80%;
      margin: auto;
      border: 5px solid #fff;
    }

    .slick-arrow {
      display: none !important;
    }

    .slick-thumb {
      bottom: 0;
    }

    .slick-thumb li {
      width: 60px;
      height: 45px;
    }

    .slick-thumb li img {
      display: block;
      width: 100%;
      height: 100%;
      filter: grayscale(100%);
    }

    .slick-thumb li.slick-active img {
      filter: grayscale(0%);
    }
  }

  /* For demo */
  .posters :deep(.ant-carousel) {
    .slick-arrow.custom-slick-arrow {
      z-index: 1;
      width: 25px;
      height: 25px;
      transition: ease all 0.3s;
      opacity: 0.3;
      background-color: rgb(31 45 61 / 11%);
      color: #fff;
      font-size: 25px;
    }

    .slick-arrow.custom-slick-arrow::before {
      display: none;
    }

    .slick-arrow.custom-slick-arrow:hover {
      opacity: 0.5;
      color: #fff;
    }
  }
</style>
