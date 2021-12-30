<template>
  <Card :bordered="false">
    <Card.Grid style="width: 25%" :hoverable="false" :bordered="false">
      <Card class="posters" :bordered="false">
        <template #cover>
          <Carousel arrows :dots="false">
            <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px">
                <LeftCircleOutlined />
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <RightCircleOutlined />
              </div>
            </template>
            <template v-for="item in heroInfo.posters" :key="item">
              <img :src="item" alt="" />
            </template>
          </Carousel>
        </template>
        <Card.Meta :title="`${heroInfo.name}  ${heroInfo.title}`">
          <template #description>
            <a
              :href="`https://101.qq.com/#/hero-detail?heroid=${heroInfo.heroId}&datatype=5v5`"
              target="_blank"
            >
              详细资料
            </a>
          </template>
        </Card.Meta>
      </Card>
    </Card.Grid>
    <Card.Grid class="skins" style="width: 75%" :hoverable="false" :bordered="false">
      <Carousel arrows effect="fade" dots-class="slick-dots slick-thumb">
        <template #customPaging="props">
          <a>
            <img :src="heroInfo.skins[props.i]" />
          </a>
        </template>
        <div v-for="item in heroInfo.skins" :key="item">
          <img :src="item" />
        </div>
      </Carousel>
    </Card.Grid>
  </Card>
</template>

<script lang="ts">
  export default {
    name: 'LoLHeroInfo',
  };
</script>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Carousel, Card } from 'ant-design-vue';
  import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
  import { getLolHeroInfo } from '@/api/demos/hero';
  import { useRoute } from 'vue-router';
  import { useTabsViewStore } from '@/store/modules/tabsView';

  const route = useRoute();
  const tabsViewStore = useTabsViewStore();
  const heroInfo = ref<any>({});

  onMounted(async () => {
    const { data } = await getLolHeroInfo({ id: route.params.id });
    heroInfo.value = data;
    tabsViewStore.updateTabTitle(`${route.meta.title}(${heroInfo.value.title})`);
  });
</script>

<style lang="less" scoped>
  .skins :deep(.ant-carousel) {
    text-align: center;
    .slick-dots {
      position: relative;
      height: auto;
    }
    .slick-slide img {
      border: 5px solid #fff;
      display: block;
      margin: auto;
    }
    .slick-arrow {
      display: none !important;
    }
    .slick-thumb {
      bottom: 0px;
    }
    .slick-thumb li {
      width: 60px;
      height: 45px;
    }
    .slick-thumb li img {
      width: 100%;
      height: 100%;
      filter: grayscale(100%);
    }
    .slick-thumb li.slick-active img {
      filter: grayscale(0%);
    }
  }
  /* For demo */

  /* For demo */
  .posters :deep(.ant-carousel) {
    .slick-arrow.custom-slick-arrow {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #fff;
      background-color: rgba(31, 45, 61, 0.11);
      opacity: 0.3;
      z-index: 1;
    }
    .slick-prev {
      left: 10px;
    }

    .custom-slick-arrow:hover {
      opacity: 0.5;
    }
  }
</style>
