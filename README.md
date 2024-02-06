# vue3-antdv-admin

基于 vite5.x + vue3.x + antd-design-vue4.x + typescript5.x 的后台管理系统

- 账号：admin，密码：a123456
- [在线预览](http://buqiyuan.gitee.io/vue3-antdv-admin/)
- [项目文档](https://buqiyuan.github.io/vue3-antdv-admin-docs/)
- [swagger 文档](https://nest-api.buqiyuan.site/api-docs/)
- [后端仓库地址](https://github.com/buqiyuan/nest-admin)
- [gitee 地址](https://gitee.com/buqiyuan/vue3-antdv-admin)
- 根据 JSON 生成 typescript 的工具：[http://json2ts.com/](http://json2ts.com/)

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/buqiyuan/vue3-antdv-admin
```

- 安装依赖

```bash
cd vue3-antdv-admin

pnpm install

```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## vscode 配置

安装项目根目录 `.vscode` 推荐的插件，再安装 `Volar`，并禁用 `Vetur`，重启 vscode 即可。

> 使用了 Vue3.x 全家桶、ant-design-vue4.x 和 typescript5.x，实践 vue3.x 的新特性以及玩法，不得不说 vue3.x 的 Composition API 相比于 vue2.x 的 Options API 灵活很多，让我们可以灵活地组合组件逻辑，我们可以很轻松的使用 hooks 的形式去代替以前 mixins 等的写法。更多 hooks 可以参考[vueuse](https://vueuse.org/functions.html)

### todolist

- [x] 动态表格(完善中)
- [x] 动态表单(完善中)
- [ ] 电商 SKU 功能演示
- [ ] 纯前端导出 PDF 动态分页
- [ ] 其他...

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 更新日志

[CHANGELOG](./CHANGELOG.md)

## 赞赏

如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持!

| 微信 | 支付宝 |
| :-: | :-: |
| <img src="https://cdn.jsdelivr.net/gh/buqiyuan/MyImageHosting/imgs/vue3-antdv-admin/weixin.jpg" height="220" /> | <img src="https://cdn.jsdelivr.net/gh/buqiyuan/MyImageHosting/imgs/vue3-antdv-admin/zhifubao.jpg" height="220" /> |

## 感谢 JetBrains 免费的开源授权

<a href="https://www.jetbrains.com/?from=Mybatis-PageHelper" target="_blank">
<img src="https://user-images.githubusercontent.com/1787798/69898077-4f4e3d00-138f-11ea-81f9-96fb7c49da89.png" height="200"/></a>
