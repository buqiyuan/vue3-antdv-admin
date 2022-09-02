# [1.1.0](https://github.com/buqiyuan/vue3-antd-admin/compare/v1.0.1...v1.1.0) (2022-09-02)

### Bug Fixes

- add menu type judgment ([41bcd22](https://github.com/buqiyuan/vue3-antd-admin/commit/41bcd226be776c159796b09a71f20809bce12d3e))
- **babel.config.js:** use polyfill of Array.prototype.at ([c0b25f0](https://github.com/buqiyuan/vue3-antd-admin/commit/c0b25f07d466d195beafc38296ec8bc5ea447d4b))
- **components:** [dynamic-table] initial fetchData did not carry the default value ([c2a31d4](https://github.com/buqiyuan/vue3-antd-admin/commit/c2a31d4045ad65f7ae0c7862ad1ee60722a4543f))
- **components:** [dynamic-table] parameter missing [#95](https://github.com/buqiyuan/vue3-antd-admin/issues/95) ([31758b5](https://github.com/buqiyuan/vue3-antd-admin/commit/31758b577f399ed80e1d05037a6dea87fdec099f))
- **dynamic-table:** add onChangeParams param for dataRequest ([9c9ec46](https://github.com/buqiyuan/vue3-antd-admin/commit/9c9ec463f12b60eda40f4cb69076d097c8b34363))
- invalid regular expression in safari ([6375f53](https://github.com/buqiyuan/vue3-antd-admin/commit/6375f532e9459e96f93dc40b56e52d7766d6ebbc)), closes [#108](https://github.com/buqiyuan/vue3-antd-admin/issues/108)
- **pages:** about page link issues ([8b87e06](https://github.com/buqiyuan/vue3-antd-admin/commit/8b87e061129277fd737f1ed6071282ea8a3e2f06))
- **projects:** 修复 tabs-view 下拉菜单溢出,移除@vue/compiler-sfc 依赖 ([2d5f011](https://github.com/buqiyuan/vue3-antd-admin/commit/2d5f0119a1a045aeb7b62c97b771a296dadea93f))
- router redirect error when logout [#98](https://github.com/buqiyuan/vue3-antd-admin/issues/98) ([32c0a15](https://github.com/buqiyuan/vue3-antd-admin/commit/32c0a157e716521037ccc5bfcd116b8a9f6a3ded))
- **schema-form:** update props issue ([62f7a4e](https://github.com/buqiyuan/vue3-antd-admin/commit/62f7a4e79117ddd00ff21b033f2f63296af554c6))
- some css style issues ([31cbd31](https://github.com/buqiyuan/vue3-antd-admin/commit/31cbd310ee96f98559694b77a654e861d6bf6794))
- some ts type issue ([fdbaf55](https://github.com/buqiyuan/vue3-antd-admin/commit/fdbaf55d23e54ea8c20535de2e21b8cef7deaa4a))
- **user:** getInfo、getInfo api network error causing infinite retries ([#100](https://github.com/buqiyuan/vue3-antd-admin/issues/100)) ([a73d4ad](https://github.com/buqiyuan/vue3-antd-admin/commit/a73d4adcf2c126341f79df176b2318cd2cb38eae))
- **utils:** [is] always false of isPromise [#107](https://github.com/buqiyuan/vue3-antd-admin/issues/107) ([ec9a6b7](https://github.com/buqiyuan/vue3-antd-admin/commit/ec9a6b725531078834a8aa46b1ea7a0284db458d))

### Features

- 当前用户角色权限变更时实时更新权限菜单 ([adbda89](https://github.com/buqiyuan/vue3-antd-admin/commit/adbda89c97b2bc91b0bcf295e76053b62afdc238))
- **components:** [dynamic-table] cell support defaultEditable ([03e7806](https://github.com/buqiyuan/vue3-antd-admin/commit/03e7806780193a200251f3f7d0c851beb312e553))
- **components:** [dynamic-table] support cell edit ([0eccb9a](https://github.com/buqiyuan/vue3-antd-admin/commit/0eccb9ac7b225f3a63674196f2bafe5fa6d99c65))
- **components:** [ProjectSetting] config project style online ([2031927](https://github.com/buqiyuan/vue3-antd-admin/commit/2031927c62774e4c47aeebfb9ba2ec0026e0632f))
- edit-row-table support save loading ([b24e25a](https://github.com/buqiyuan/vue3-antd-admin/commit/b24e25ad829c484628b09d291db5e01b4f5275db))
- support for nested routes ([79b2093](https://github.com/buqiyuan/vue3-antd-admin/commit/79b209361f4cb77a7128fa6ed3a8a626d4143934))
- update basic-form demo ([bea6824](https://github.com/buqiyuan/vue3-antd-admin/commit/bea6824fd7c28e2b9097c7a308d58b8976d1767d))

## [1.0.1](https://github.com/buqiyuan/vue3-antd-admin/compare/v0.1.4...v1.0.1) (2022-03-15)

### Bug Fixes

- 左侧菜单超出屏幕不能滚动问题 ([076dc79](https://github.com/buqiyuan/vue3-antd-admin/commit/076dc79896496776701b158950960a08a4490707))
- add menu sort ([6309089](https://github.com/buqiyuan/vue3-antd-admin/commit/630908988286d062bdce9a433ea5e785dbf8659d))
- **component:** fix schema-form vIf logic [#83](https://github.com/buqiyuan/vue3-antd-admin/issues/83) ([ab5dfc1](https://github.com/buqiyuan/vue3-antd-admin/commit/ab5dfc1daf7a2f32c97159c1724281bd86d945ca))
- **components:** [draggable-modal] close after route switch ([6101460](https://github.com/buqiyuan/vue3-antd-admin/commit/6101460370627338c82bdc88f0e817bcfa07c830))
- **components:** [schema-form] placeholder typo ([3d9ea50](https://github.com/buqiyuan/vue3-antd-admin/commit/3d9ea507de1104f87aa199a07950b118cbd9522a))
- fix schema-form type tip ([3bbc9e5](https://github.com/buqiyuan/vue3-antd-admin/commit/3bbc9e546dba3719b987d2a9d9c82d35183ab67c))
- some route file path error ([9d21419](https://github.com/buqiyuan/vue3-antd-admin/commit/9d2141921027f398e55202c07ea5a83cc340ef7f))
- **useModal:** fix circular dependency ([3fc4ae8](https://github.com/buqiyuan/vue3-antd-admin/commit/3fc4ae801736383b16fbe4d4590794fb79755202))

### Features

- **views:** add about page ([b320ed8](https://github.com/buqiyuan/vue3-antd-admin/commit/b320ed8aa30ccbff87fc87d944cbf7cc2f003259))

## [0.1.4](https://github.com/buqiyuan/vue3-antd-admin/compare/v0.1.3...v0.1.4) (2022-01-05)

### Bug Fixes

- app search support i18 ([34c35ce](https://github.com/buqiyuan/vue3-antd-admin/commit/34c35ce4b05ad83ba3aec1f6487aad8cadde1538))
- revert antdv version ([d5804ee](https://github.com/buqiyuan/vue3-antd-admin/commit/d5804ee4200da0144bdcc5aae4a082e622e56c59))

### Features

- 表格导出功能 ([2cdcb71](https://github.com/buqiyuan/vue3-antd-admin/commit/2cdcb7153c48f7c70ef12951a97b7b65abe94861))
- 当搜索菜单结果为空时不触发 enter 事件 ([75c9f55](https://github.com/buqiyuan/vue3-antd-admin/commit/75c9f557b19b00bfd8516246b56e9eeec127dd24))
- **page:** 新增查询表格使用示例 ([1b5e258](https://github.com/buqiyuan/vue3-antd-admin/commit/1b5e25846133b88a78becca3747bfb55a765b8b1))

## 0.1.3 (2022-01-03)

### Bug Fixes

- :art: fix some css style ([7b7f17a](https://github.com/buqiyuan/vue3-antd-admin/commit/7b7f17a0b1b7dd8ce0bc8c5022d2328d7544f5da))
- :bug: router navigation bug ([15aec11](https://github.com/buqiyuan/vue3-antd-admin/commit/15aec11c78aedf482473a17867aaf261905afdf6))
- :bug:角色管理权限勾选问题 ([760f21a](https://github.com/buqiyuan/vue3-antd-admin/commit/760f21a5e7cb989e456c294d80b80b4a27bec758))
- :bug:生成路由出错问题 ([e164bf1](https://github.com/buqiyuan/vue3-antd-admin/commit/e164bf17b6a9f905c5c78b51b2a46b54ff554077))
- :bug:修复某些权限码传参错误 ([e3a5893](https://github.com/buqiyuan/vue3-antd-admin/commit/e3a5893411ee31f8bd34b337055b09cdd656d8f4))
- 面包屑导航和弹窗拖拽后宽度问题 ([f4a24ef](https://github.com/buqiyuan/vue3-antd-admin/commit/f4a24ef4171f1d477a50c723aeaadf66823fe686))
- 删除一些多余的旧代码 ([16042d2](https://github.com/buqiyuan/vue3-antd-admin/commit/16042d2897acb84cf58cdb955fc16b20d4c23735))
- 删除一些冗余的旧代码 ([ddedca2](https://github.com/buqiyuan/vue3-antd-admin/commit/ddedca2179f2740affbbd1414bd67fb290784d9a))
- 修复菜单为目录类型时路由报错 ([7dcec87](https://github.com/buqiyuan/vue3-antd-admin/commit/7dcec87be9460c73b5651384083702257a4c9291))
- 一些依赖版本问题 ([9494edf](https://github.com/buqiyuan/vue3-antd-admin/commit/9494edf997df84d86d2b49bacc6a3ccdbebac491))
- **component:** :bug:修复 dynamicTable ts 类型错误 ([00fa173](https://github.com/buqiyuan/vue3-antd-admin/commit/00fa1732904c2accfc8b1917b7a428a630b8cee5))
- mock 数据在生产环境无法使用 ([c154d1e](https://github.com/buqiyuan/vue3-antd-admin/commit/c154d1e67afa088360e5f62d2c78626c8a3c38a9))
- **projects:** 修复搜索菜单时 title 可能为空的情况 ([377a416](https://github.com/buqiyuan/vue3-antd-admin/commit/377a41646ee5361e9e378e3f6361e1f43afa8f4f))
- remove useModal.tsx ([24dff4e](https://github.com/buqiyuan/vue3-antd-admin/commit/24dff4e0d9654926c987c8e85ca8cb6338e1f610))
- **request.ts:** baseUrl 错误 ([3818cb2](https://github.com/buqiyuan/vue3-antd-admin/commit/3818cb2753249aef220e21139ea32083ba4aa71e))
- **request.ts:** baseUrl 错误 ([36a1346](https://github.com/buqiyuan/vue3-antd-admin/commit/36a1346b57f5f477ab3c68f4753117f5e833f317))
- **request.ts:** baseUrl 路径替换正则错误 ([39c61e3](https://github.com/buqiyuan/vue3-antd-admin/commit/39c61e3fba2fe2611410f5b2072663d0ce299407))
- rootadmin 假退出登录,避免其他人被迫下线 ([4fc62a9](https://github.com/buqiyuan/vue3-antd-admin/commit/4fc62a940dffa05511b524865bf50e9cab2eaaf6))

### Features

- :sparkles: 新增国际化 ([5c8c2b4](https://github.com/buqiyuan/vue3-antd-admin/commit/5c8c2b4b855f13bb01eb0f5401f1dfbf0bc103ec))
- 表格列设置工具栏 ([061c6ed](https://github.com/buqiyuan/vue3-antd-admin/commit/061c6edff076c36f3cc074eba96c5ba89d106a8f))
- 定时任务 ([ae2615d](https://github.com/buqiyuan/vue3-antd-admin/commit/ae2615df1758e181c1a264af81a6b4d8bd804ea1))
- 服务监控页面 ([b2bbfad](https://github.com/buqiyuan/vue3-antd-admin/commit/b2bbfadc690873cafb7ab242b32614fea1710737))
- 全局挂载 Reflect 反射对象 ([e5ba20a](https://github.com/buqiyuan/vue3-antd-admin/commit/e5ba20ac57131e070074154fbb874e3d97720888))
- 新增按钮权限 ([f65c95c](https://github.com/buqiyuan/vue3-antd-admin/commit/f65c95cb5282a2c64154d8cdc276bf4868e1ba38))
- 新增在线用户管理 ([cff7647](https://github.com/buqiyuan/vue3-antd-admin/commit/cff76475708c290086e2f25cf58c39549f8b32a8))
- **env.d.ts:** 增加环境变量类型声明文件 ([96489b1](https://github.com/buqiyuan/vue3-antd-admin/commit/96489b15ebe82a2af3071ff7a5c4ab5425fba0b0))
- **projects:** 全局搜索菜单功能 ([b4c9ba9](https://github.com/buqiyuan/vue3-antd-admin/commit/b4c9ba941110b1358bd16dd128208243588317ab))
- **projects:** 搜索菜单增加大小写转换 ([7ec9777](https://github.com/buqiyuan/vue3-antd-admin/commit/7ec977795de144fbd208540d3ee14fa8868ddd9b))
- **projects:** 图片预览，SuspenseWithError，operate-row 组件重构为 setup 语法以及引入 dayjs 中文包 ([f7aceff](https://github.com/buqiyuan/vue3-antd-admin/commit/f7aceffa9f4eaf5159f4c3d24589bdfc610613eb))

## 0.1.2 (2022-01-03)

### Bug Fixes

- :art: fix some css style ([7b7f17a](https://github.com/buqiyuan/vue3-antd-admin/commit/7b7f17a0b1b7dd8ce0bc8c5022d2328d7544f5da))
- :bug: router navigation bug ([15aec11](https://github.com/buqiyuan/vue3-antd-admin/commit/15aec11c78aedf482473a17867aaf261905afdf6))
- :bug:角色管理权限勾选问题 ([760f21a](https://github.com/buqiyuan/vue3-antd-admin/commit/760f21a5e7cb989e456c294d80b80b4a27bec758))
- :bug:生成路由出错问题 ([e164bf1](https://github.com/buqiyuan/vue3-antd-admin/commit/e164bf17b6a9f905c5c78b51b2a46b54ff554077))
- :bug:修复某些权限码传参错误 ([e3a5893](https://github.com/buqiyuan/vue3-antd-admin/commit/e3a5893411ee31f8bd34b337055b09cdd656d8f4))
- 面包屑导航和弹窗拖拽后宽度问题 ([f4a24ef](https://github.com/buqiyuan/vue3-antd-admin/commit/f4a24ef4171f1d477a50c723aeaadf66823fe686))
- 删除一些多余的旧代码 ([16042d2](https://github.com/buqiyuan/vue3-antd-admin/commit/16042d2897acb84cf58cdb955fc16b20d4c23735))
- 删除一些冗余的旧代码 ([ddedca2](https://github.com/buqiyuan/vue3-antd-admin/commit/ddedca2179f2740affbbd1414bd67fb290784d9a))
- 修复菜单为目录类型时路由报错 ([7dcec87](https://github.com/buqiyuan/vue3-antd-admin/commit/7dcec87be9460c73b5651384083702257a4c9291))
- 一些依赖版本问题 ([9494edf](https://github.com/buqiyuan/vue3-antd-admin/commit/9494edf997df84d86d2b49bacc6a3ccdbebac491))
- **component:** :bug:修复 dynamicTable ts 类型错误 ([00fa173](https://github.com/buqiyuan/vue3-antd-admin/commit/00fa1732904c2accfc8b1917b7a428a630b8cee5))
- mock 数据在生产环境无法使用 ([c154d1e](https://github.com/buqiyuan/vue3-antd-admin/commit/c154d1e67afa088360e5f62d2c78626c8a3c38a9))
- **projects:** 修复搜索菜单时 title 可能为空的情况 ([377a416](https://github.com/buqiyuan/vue3-antd-admin/commit/377a41646ee5361e9e378e3f6361e1f43afa8f4f))
- remove useModal.tsx ([24dff4e](https://github.com/buqiyuan/vue3-antd-admin/commit/24dff4e0d9654926c987c8e85ca8cb6338e1f610))
- **request.ts:** baseUrl 错误 ([3818cb2](https://github.com/buqiyuan/vue3-antd-admin/commit/3818cb2753249aef220e21139ea32083ba4aa71e))
- **request.ts:** baseUrl 错误 ([36a1346](https://github.com/buqiyuan/vue3-antd-admin/commit/36a1346b57f5f477ab3c68f4753117f5e833f317))
- **request.ts:** baseUrl 路径替换正则错误 ([39c61e3](https://github.com/buqiyuan/vue3-antd-admin/commit/39c61e3fba2fe2611410f5b2072663d0ce299407))
- rootadmin 假退出登录,避免其他人被迫下线 ([4fc62a9](https://github.com/buqiyuan/vue3-antd-admin/commit/4fc62a940dffa05511b524865bf50e9cab2eaaf6))

### Features

- :sparkles: 新增国际化 ([5c8c2b4](https://github.com/buqiyuan/vue3-antd-admin/commit/5c8c2b4b855f13bb01eb0f5401f1dfbf0bc103ec))
- 表格列设置工具栏 ([061c6ed](https://github.com/buqiyuan/vue3-antd-admin/commit/061c6edff076c36f3cc074eba96c5ba89d106a8f))
- 定时任务 ([ae2615d](https://github.com/buqiyuan/vue3-antd-admin/commit/ae2615df1758e181c1a264af81a6b4d8bd804ea1))
- 服务监控页面 ([b2bbfad](https://github.com/buqiyuan/vue3-antd-admin/commit/b2bbfadc690873cafb7ab242b32614fea1710737))
- 全局挂载 Reflect 反射对象 ([e5ba20a](https://github.com/buqiyuan/vue3-antd-admin/commit/e5ba20ac57131e070074154fbb874e3d97720888))
- 新增按钮权限 ([f65c95c](https://github.com/buqiyuan/vue3-antd-admin/commit/f65c95cb5282a2c64154d8cdc276bf4868e1ba38))
- 新增在线用户管理 ([cff7647](https://github.com/buqiyuan/vue3-antd-admin/commit/cff76475708c290086e2f25cf58c39549f8b32a8))
- **env.d.ts:** 增加环境变量类型声明文件 ([96489b1](https://github.com/buqiyuan/vue3-antd-admin/commit/96489b15ebe82a2af3071ff7a5c4ab5425fba0b0))
- **projects:** 全局搜索菜单功能 ([b4c9ba9](https://github.com/buqiyuan/vue3-antd-admin/commit/b4c9ba941110b1358bd16dd128208243588317ab))
- **projects:** 搜索菜单增加大小写转换 ([7ec9777](https://github.com/buqiyuan/vue3-antd-admin/commit/7ec977795de144fbd208540d3ee14fa8868ddd9b))
- **projects:** 图片预览，SuspenseWithError，operate-row 组件重构为 setup 语法以及引入 dayjs 中文包 ([f7aceff](https://github.com/buqiyuan/vue3-antd-admin/commit/f7aceffa9f4eaf5159f4c3d24589bdfc610613eb))

## 0.1.1 (2022-01-03)

### Bug Fixes

- :art: fix some css style ([7b7f17a](https://github.com/buqiyuan/vue3-antd-admin/commit/7b7f17a0b1b7dd8ce0bc8c5022d2328d7544f5da))
- :bug: router navigation bug ([15aec11](https://github.com/buqiyuan/vue3-antd-admin/commit/15aec11c78aedf482473a17867aaf261905afdf6))
- :bug:角色管理权限勾选问题 ([760f21a](https://github.com/buqiyuan/vue3-antd-admin/commit/760f21a5e7cb989e456c294d80b80b4a27bec758))
- :bug:生成路由出错问题 ([e164bf1](https://github.com/buqiyuan/vue3-antd-admin/commit/e164bf17b6a9f905c5c78b51b2a46b54ff554077))
- :bug:修复某些权限码传参错误 ([e3a5893](https://github.com/buqiyuan/vue3-antd-admin/commit/e3a5893411ee31f8bd34b337055b09cdd656d8f4))
- 面包屑导航和弹窗拖拽后宽度问题 ([f4a24ef](https://github.com/buqiyuan/vue3-antd-admin/commit/f4a24ef4171f1d477a50c723aeaadf66823fe686))
- 删除一些多余的旧代码 ([16042d2](https://github.com/buqiyuan/vue3-antd-admin/commit/16042d2897acb84cf58cdb955fc16b20d4c23735))
- 删除一些冗余的旧代码 ([ddedca2](https://github.com/buqiyuan/vue3-antd-admin/commit/ddedca2179f2740affbbd1414bd67fb290784d9a))
- 修复菜单为目录类型时路由报错 ([7dcec87](https://github.com/buqiyuan/vue3-antd-admin/commit/7dcec87be9460c73b5651384083702257a4c9291))
- 一些依赖版本问题 ([9494edf](https://github.com/buqiyuan/vue3-antd-admin/commit/9494edf997df84d86d2b49bacc6a3ccdbebac491))
- **component:** :bug:修复 dynamicTable ts 类型错误 ([00fa173](https://github.com/buqiyuan/vue3-antd-admin/commit/00fa1732904c2accfc8b1917b7a428a630b8cee5))
- mock 数据在生产环境无法使用 ([c154d1e](https://github.com/buqiyuan/vue3-antd-admin/commit/c154d1e67afa088360e5f62d2c78626c8a3c38a9))
- **projects:** 修复搜索菜单时 title 可能为空的情况 ([377a416](https://github.com/buqiyuan/vue3-antd-admin/commit/377a41646ee5361e9e378e3f6361e1f43afa8f4f))
- remove useModal.tsx ([24dff4e](https://github.com/buqiyuan/vue3-antd-admin/commit/24dff4e0d9654926c987c8e85ca8cb6338e1f610))
- **request.ts:** baseUrl 错误 ([3818cb2](https://github.com/buqiyuan/vue3-antd-admin/commit/3818cb2753249aef220e21139ea32083ba4aa71e))
- **request.ts:** baseUrl 错误 ([36a1346](https://github.com/buqiyuan/vue3-antd-admin/commit/36a1346b57f5f477ab3c68f4753117f5e833f317))
- **request.ts:** baseUrl 路径替换正则错误 ([39c61e3](https://github.com/buqiyuan/vue3-antd-admin/commit/39c61e3fba2fe2611410f5b2072663d0ce299407))
- rootadmin 假退出登录,避免其他人被迫下线 ([4fc62a9](https://github.com/buqiyuan/vue3-antd-admin/commit/4fc62a940dffa05511b524865bf50e9cab2eaaf6))

### Features

- :sparkles: 新增国际化 ([5c8c2b4](https://github.com/buqiyuan/vue3-antd-admin/commit/5c8c2b4b855f13bb01eb0f5401f1dfbf0bc103ec))
- 表格列设置工具栏 ([061c6ed](https://github.com/buqiyuan/vue3-antd-admin/commit/061c6edff076c36f3cc074eba96c5ba89d106a8f))
- 定时任务 ([ae2615d](https://github.com/buqiyuan/vue3-antd-admin/commit/ae2615df1758e181c1a264af81a6b4d8bd804ea1))
- 服务监控页面 ([b2bbfad](https://github.com/buqiyuan/vue3-antd-admin/commit/b2bbfadc690873cafb7ab242b32614fea1710737))
- 全局挂载 Reflect 反射对象 ([e5ba20a](https://github.com/buqiyuan/vue3-antd-admin/commit/e5ba20ac57131e070074154fbb874e3d97720888))
- 新增按钮权限 ([f65c95c](https://github.com/buqiyuan/vue3-antd-admin/commit/f65c95cb5282a2c64154d8cdc276bf4868e1ba38))
- 新增在线用户管理 ([cff7647](https://github.com/buqiyuan/vue3-antd-admin/commit/cff76475708c290086e2f25cf58c39549f8b32a8))
- **env.d.ts:** 增加环境变量类型声明文件 ([96489b1](https://github.com/buqiyuan/vue3-antd-admin/commit/96489b15ebe82a2af3071ff7a5c4ab5425fba0b0))
- **projects:** 全局搜索菜单功能 ([b4c9ba9](https://github.com/buqiyuan/vue3-antd-admin/commit/b4c9ba941110b1358bd16dd128208243588317ab))
- **projects:** 搜索菜单增加大小写转换 ([7ec9777](https://github.com/buqiyuan/vue3-antd-admin/commit/7ec977795de144fbd208540d3ee14fa8868ddd9b))
- **projects:** 图片预览，SuspenseWithError，operate-row 组件重构为 setup 语法以及引入 dayjs 中文包 ([f7aceff](https://github.com/buqiyuan/vue3-antd-admin/commit/f7aceffa9f4eaf5159f4c3d24589bdfc610613eb))

## 0.1.1 (2022-01-03)

### Bug Fixes

- :art: fix some css style ([7b7f17a](https://github.com/buqiyuan/vue3-antd-admin/commit/7b7f17a0b1b7dd8ce0bc8c5022d2328d7544f5da))
- :bug: router navigation bug ([15aec11](https://github.com/buqiyuan/vue3-antd-admin/commit/15aec11c78aedf482473a17867aaf261905afdf6))
- :bug:角色管理权限勾选问题 ([760f21a](https://github.com/buqiyuan/vue3-antd-admin/commit/760f21a5e7cb989e456c294d80b80b4a27bec758))
- :bug:生成路由出错问题 ([e164bf1](https://github.com/buqiyuan/vue3-antd-admin/commit/e164bf17b6a9f905c5c78b51b2a46b54ff554077))
- :bug:修复某些权限码传参错误 ([e3a5893](https://github.com/buqiyuan/vue3-antd-admin/commit/e3a5893411ee31f8bd34b337055b09cdd656d8f4))
- 面包屑导航和弹窗拖拽后宽度问题 ([f4a24ef](https://github.com/buqiyuan/vue3-antd-admin/commit/f4a24ef4171f1d477a50c723aeaadf66823fe686))
- 删除一些多余的旧代码 ([16042d2](https://github.com/buqiyuan/vue3-antd-admin/commit/16042d2897acb84cf58cdb955fc16b20d4c23735))
- 删除一些冗余的旧代码 ([ddedca2](https://github.com/buqiyuan/vue3-antd-admin/commit/ddedca2179f2740affbbd1414bd67fb290784d9a))
- 修复菜单为目录类型时路由报错 ([7dcec87](https://github.com/buqiyuan/vue3-antd-admin/commit/7dcec87be9460c73b5651384083702257a4c9291))
- 一些依赖版本问题 ([9494edf](https://github.com/buqiyuan/vue3-antd-admin/commit/9494edf997df84d86d2b49bacc6a3ccdbebac491))
- **component:** :bug:修复 dynamicTable ts 类型错误 ([00fa173](https://github.com/buqiyuan/vue3-antd-admin/commit/00fa1732904c2accfc8b1917b7a428a630b8cee5))
- mock 数据在生产环境无法使用 ([c154d1e](https://github.com/buqiyuan/vue3-antd-admin/commit/c154d1e67afa088360e5f62d2c78626c8a3c38a9))
- **projects:** 修复搜索菜单时 title 可能为空的情况 ([377a416](https://github.com/buqiyuan/vue3-antd-admin/commit/377a41646ee5361e9e378e3f6361e1f43afa8f4f))
- remove useModal.tsx ([24dff4e](https://github.com/buqiyuan/vue3-antd-admin/commit/24dff4e0d9654926c987c8e85ca8cb6338e1f610))
- **request.ts:** baseUrl 错误 ([3818cb2](https://github.com/buqiyuan/vue3-antd-admin/commit/3818cb2753249aef220e21139ea32083ba4aa71e))
- **request.ts:** baseUrl 错误 ([36a1346](https://github.com/buqiyuan/vue3-antd-admin/commit/36a1346b57f5f477ab3c68f4753117f5e833f317))
- **request.ts:** baseUrl 路径替换正则错误 ([39c61e3](https://github.com/buqiyuan/vue3-antd-admin/commit/39c61e3fba2fe2611410f5b2072663d0ce299407))
- rootadmin 假退出登录,避免其他人被迫下线 ([4fc62a9](https://github.com/buqiyuan/vue3-antd-admin/commit/4fc62a940dffa05511b524865bf50e9cab2eaaf6))

### Features

- 表格列设置工具栏 ([061c6ed](https://github.com/buqiyuan/vue3-antd-admin/commit/061c6edff076c36f3cc074eba96c5ba89d106a8f))
- 定时任务 ([ae2615d](https://github.com/buqiyuan/vue3-antd-admin/commit/ae2615df1758e181c1a264af81a6b4d8bd804ea1))
- 服务监控页面 ([b2bbfad](https://github.com/buqiyuan/vue3-antd-admin/commit/b2bbfadc690873cafb7ab242b32614fea1710737))
- 全局挂载 Reflect 反射对象 ([e5ba20a](https://github.com/buqiyuan/vue3-antd-admin/commit/e5ba20ac57131e070074154fbb874e3d97720888))
- 新增按钮权限 ([f65c95c](https://github.com/buqiyuan/vue3-antd-admin/commit/f65c95cb5282a2c64154d8cdc276bf4868e1ba38))
- 新增国际化 ([216b32c](https://github.com/buqiyuan/vue3-antd-admin/commit/216b32ccbeb911105db86924be91ad8641cc6c7b))
- 新增在线用户管理 ([cff7647](https://github.com/buqiyuan/vue3-antd-admin/commit/cff76475708c290086e2f25cf58c39549f8b32a8))
- **env.d.ts:** 增加环境变量类型声明文件 ([96489b1](https://github.com/buqiyuan/vue3-antd-admin/commit/96489b15ebe82a2af3071ff7a5c4ab5425fba0b0))
- **projects:** 全局搜索菜单功能 ([b4c9ba9](https://github.com/buqiyuan/vue3-antd-admin/commit/b4c9ba941110b1358bd16dd128208243588317ab))
- **projects:** 搜索菜单增加大小写转换 ([7ec9777](https://github.com/buqiyuan/vue3-antd-admin/commit/7ec977795de144fbd208540d3ee14fa8868ddd9b))
- **projects:** 图片预览，SuspenseWithError，operate-row 组件重构为 setup 语法以及引入 dayjs 中文包 ([f7aceff](https://github.com/buqiyuan/vue3-antd-admin/commit/f7aceffa9f4eaf5159f4c3d24589bdfc610613eb))
