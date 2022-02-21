<template>
  <div>
    <Card>
      <Card.Meta title="关于">
        <template #description>
          <BlankLink :url="pkg.author.url" :text="pkg.name" />的前端项目是基于Vue3.x、Vue-CLI5.x、
          Ant-Design-Vue3.x 、TypeScript4.x开发，
          内置了动态路由、权限验证、并提供了常用的功能组件，帮助你快速搭建企业级中后台产品原型。
          原则上不会限制任何代码用于商用。
        </template>
      </Card.Meta>
    </Card>
    <Card class="mt-3">
      <Descriptions title="项目信息" :column="2" bordered>
        <Descriptions.Item label="版本">
          <Tag color="processing">{{ pkg.version }}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="最后编译时间">
          <Tag color="processing">{{ lastBuildTime }}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="GitHub">
          <BlankLink :url="pkg.repository.url" text="GitHub" />
        </Descriptions.Item>
        <Descriptions.Item label="预览地址">
          <BlankLink :url="pkg.homepage" text="预览地址" />
        </Descriptions.Item>
      </Descriptions>
    </Card>
    <Card class="mt-3">
      <Descriptions title="生产环境依赖" bordered>
        <template v-for="(value, key) in pkg.dependencies" :key="key">
          <Descriptions.Item :label="key">
            <BlankLink :url="value.url" :text="value.version" />
          </Descriptions.Item>
        </template>
      </Descriptions>
    </Card>
    <Card class="mt-3">
      <Descriptions title="开发环境依赖" bordered>
        <template v-for="(value, key) in pkg.devDependencies" :key="key">
          <Descriptions.Item :label="key">
            <BlankLink :url="value.url" :text="value.version" />
          </Descriptions.Item>
        </template>
      </Descriptions>
    </Card>
  </div>
</template>

<script setup lang="tsx">
  import { Descriptions, Card, Tag } from 'ant-design-vue';
  const { pkg, lastBuildTime } = __APP_INFO__;

  const BlankLink = ({ url = '', text }) => (
    <a href={url.replace('git+', '')} target="_blank">
      {text}
    </a>
  );
</script>
