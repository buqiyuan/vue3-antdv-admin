# vue3-antdv-admin

Nest Admin 的前端。这一版用 **shadcn-vue（reka-ui）**、**Tailwind CSS v4** 和 **Vite+** 重写了壳层，不再依赖 Ant Design Vue。

后端仍然是 [nest-admin](https://github.com/buqiyuan/nest-admin)。接口契约没有改。

- 演示账号：`admin` / `a123456`
- 接口文档：https://nest-api.buqiyuan.site/api-docs/

## 架构

| 层          | 选择                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------- |
| UI          | shadcn-vue（`components.json` 风格 `reka-nova`）+ Tailwind v4                                       |
| 路由 / 状态 | Vue Router 5、Pinia 4                                                                               |
| 请求        | Axios，响应体 `{ code, message, data }`，`code === 200` 为成功                                      |
| 文案        | vue-i18n（`zh-CN` / `en`），只覆盖壳层和已重写页面                                                  |
| 主题        | `html.dark` class，跟 shadcn CSS 变量走                                                             |
| 工具链      | Vite+ 1.4（`vp`）。Vite 通过 catalog 指向 `@voidzero-dev/vite-plus-core@1.4.0`，Vitest 锁定 `5.0.5` |

`vite.config.ts` 使用 `defineConfig` / `lazyPlugins`（来自 `vite-plus`）。格式化是 Oxfmt，检查是 Oxlint，测试是 `vp test`。

## 本地运行

需要 Node `^22.18.0 || ^24.11.0 || >=26`，以及 pnpm 10+。

```bash
vp install
vp dev
vp test
vp check
vp build
```

`package.json` 里的 `dev` / `build` / `test` / `check` 也是这些命令。开发服务器默认 `http://127.0.0.1:8088`。

复制环境变量：

```bash
cp .env.example .env.development
```

开发态 `VITE_BASE_API_URL=/api`，Vite 会把 `/api` 转到 `VITE_API_PROXY_TARGET`（默认 `http://127.0.0.1:7001`），并去掉第一段 `/api`，留下 Nest 的全局前缀。生产环境直接请求 `VITE_BASE_API_URL`。

## 登录、登出、会话

- `POST /api/auth/login`：验证码 id + 验证码，返回 `{ token }`。请求头是 `Authorization: Bearer <token>`。
- `GET /api/account/logout`：登出。
- `GET /api/account/profile`、`/menus`、`/permissions`：进入后台时重新校验 token，并刷新菜单和按钮权限。路由守卫在整页刷新后会走这一步。
- 业务码 `1101` / `1105`（登录失效、账号在别处登录）会清掉本地 token 并回到登录页。

Nest Admin 会在库里生成 refresh token，但登录接口只把 access token 交出来，也没有公开的 refresh 交换路由（见 nest-admin issue #88）。因此这里不会去请求一个不存在的 `/auth/refresh`。如果以后的登录响应里带了 `refreshToken` 字段，客户端会把它存下来，但在后端提供交换接口之前，失效的 access token 仍然只能重新登录。

菜单来自 `/api/account/menus`。目录只出现在侧栏；页面注册成路由。组件路径能在 `src/views` 里找到就加载对应页面，否则显示迁移说明。`isExt + extOpenMode = 1` 新窗口打开，`extOpenMode = 2` 用 iframe。按钮权限用 `usePermission().can('system:user:create')`，数据来自 `/api/account/permissions`。

服务端如果通过 `GET /api/sse/:uid?token=` 推送 `updatePermsAndMenus`，侧栏会重新拉菜单和权限。

## 已经重写的页面

- 登录 / 登出、浅色深色、中英文
- 侧栏 + 顶栏，菜单来自后端
- 欢迎页
- 用户、角色、菜单的列表、新增、编辑、删除

角色表单里的菜单树对应 `menuIds`。菜单的根节点 `parentId` 仍是 `-1`。

## 破坏性变化

旧的 Ant Design Vue 封装不再存在，也不再做 1:1 兼容：

- 移除 `ant-design-vue`、`@ant-design/icons-vue`、UnoCSS、DynamicTable、SchemaForm
- 移除 `$auth` / `v-auth`。按钮权限改为 `usePermission().can(code)`
- 移除锁屏时记住密码的行为
- 移除 workspace 里的 `@admin-pkg/*`（http2 代理、msw、tinymce 资源插件、组件包）和 Nx
- 移除 mock service worker。联调直接打 Nest
- 页面级组件路径保持 `src/views/**`，但页面内部不再使用 `a-*` 组件

## 还没迁的页面

这些菜单仍会从后端挂出来。点进去会看到迁移说明，而不是旧的 Ant Design 页面：

- 部门、字典类型 / 字典项、参数配置
- 在线用户、登录日志、服务监控、定时任务
- 邮件、存储、网盘、账号设置、原来的 demo / 表格示例

后续按 shadcn-vue 的 Table / Dialog / Form 逐页补即可，不必再包一层 DynamicTable。

## 构建镜像

```bash
docker build -t vue3-antdv-admin .
```

镜像里执行 `pnpm exec vp build`。生产构建的 `VITE_BASE_URL` 来自 `.env.production`（默认 `/vue3-antdv-admin/`）。

## Deployment

[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/web-apps-hosting)
