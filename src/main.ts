// import './publicPath'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import store from '@/store'
// import {SvgIcon} from '@/components/svg-icon'
import AButton from '@/components/button'
import 'dayjs/locale/zh-cn'

import {Modal, Table, Menu, Input, Button, Form, Checkbox, Radio} from 'ant-design-vue';
// import 'ant-design-vue/components/style.js';
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/lib/style.js';
// 路由守卫
import '@/router/router-guards'
import {permission} from "@/directives/permission";
import hasPermission from "@/utils/hasPermission";

const app = createApp(App)

// app.config.globalProperties.$message = message
// 常用的ant-design-vue组件
app.component(Modal.name, Modal)
app.component(Table.name, Table)
app.component(Input.name, Input)
app.component(Input.Search.name, Input.Search)
app.component(Input.TextArea.name, Input.TextArea)
app.component(AButton.name, AButton)
// app.component(Form.name, Form)
// app.component(Form.Item.name, Form.Item)
app.use(Form)
app.use(Menu)
app.use(Checkbox)
app.use(Radio)

app.directive('permission', permission)
app.use(hasPermission)

app.use(router)
app.use(store)

console.log(store)

router.isReady().then(() => app.mount('#app'))

// app.config.devtools = true
