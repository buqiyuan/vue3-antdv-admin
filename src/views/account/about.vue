<template>
  <div>
    <Card>
      <Card.Meta title="关于">
        <template #description>
          <BlankLink :url="pkg.author.url" :text="pkg.name" />{{ description }}
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
            <BlankLink :url="key" :text="value" />
          </Descriptions.Item>
        </template>
      </Descriptions>
    </Card>
    <Card class="mt-3">
      <Descriptions title="开发环境依赖" bordered>
        <template v-for="(value, key) in pkg.devDependencies" :key="key">
          <Descriptions.Item :label="key">
            <BlankLink :url="key" :text="value" />
          </Descriptions.Item>
        </template>
      </Descriptions>
    </Card>
  </div>
</template>

<script setup lang="tsx">
  import { Descriptions, Card, Tag } from 'ant-design-vue';

  defineOptions({
    name: 'About',
  });

  const { pkg, lastBuildTime } = __APP_INFO__;
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  type DepType = keyof typeof allDeps;

  const BlankLink = ({ url = '', text }) => {
    const target = /^http(s)?:/.test(url) ? url : `https://www.npmjs.com/package/${url}`;
    return (
      <a href={target} target="_blank">
        {text}
      </a>
    );
  };

  const getMajorVersion = (depName: DepType) => {
    return allDeps[depName].match(/\d+/)?.[0] || '';
  };

  const description = `
    的前端项目是基于 Vue${getMajorVersion('vue')}.x、
    Vite${getMajorVersion('vite')}.x、
    Ant-Design-Vue${getMajorVersion('ant-design-vue')}.x 、
    TypeScript${getMajorVersion('typescript')}.x 开发，
    内置了动态路由、权限验证、并提供了常用的功能组件，帮助你快速搭建企业级中后台产品原型。
    原则上不会限制任何代码用于商用。
  `;
</script>
