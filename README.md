# vue3-antd
基于vue-cli / vite + vue3.0 + antd2.0 + ts4.0 的后台管理系统模板
- 账号：admin，密码：123456
- 在线预览：http://buqiyuan.gitee.io/vue3-antd-admin/
- API文档：http://us-la-cn2.sakurafrp.com:59660/api/v1/docs/
- 后台地址：https://github.com/buqiyuan/nestjs-mysql-api
- vue-cli版：https://github.com/buqiyuan/vue3-antd-admin/tree/main （推荐）
- vite踩坑版：https://github.com/buqiyuan/vue3-antd-admin/tree/vite-version 
> 系统模块数据是从后端获取来的真实数据，路由也是从后端动态获取的，而后端是通过内网穿透提供访问的，难免会有访问失败的情况
> 所以如果进入页面时提示网络错误，则需要再次刷新页面请求接口

> 使用了Vue3.0全家桶、ant-design-vue2.0和typescript4.0，实践vue3.0的新特性以及玩法，不得不说vue3.0的Composition API相比于vue2.0的Options API
> 灵活很多，让我们可以灵活地组合组件逻辑，我们可以很轻松的使用hooks的形式去代替以前mixins等的写法。

### 功能、组件的封装
- [x] 动态表格（扩展了伸缩列功能，以及使用JSON schema配置生成表格） // TODO 后续有待加强及完善
- [x] 动态表单（满足基本的需求） // TODO 后续有待加强及完善
- [ ] 自定义弹窗（支持8个方向拖拽改变大小以及拖拽移动位置）// TODO: 继承antd原组件所有props
- [x] 图片视频预览（目前只是简单显示）
- [x] 分割组件（目前只做了左右）
- [x] 图标组件封装(本地svg封装、阿里图标的在线和离线封装)
- [ ] 其他...

### 页面功能
#### 系统看板
- [x] 首页
- [ ] 疫情地图
- [ ] 系统日志
- [ ] 前端性能监控
#### 系统管理
- [x] 账号管理
- [x] 角色管理
- [x] 资源管理
- [x] 字典管理

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
