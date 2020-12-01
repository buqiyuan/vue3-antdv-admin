// import './publicPath'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import store from '@/store'
// import {SvgIcon} from '@/components/svg-icon'
import {AButton} from '@/components/button/'

import {Modal, Table, Menu, Input, Form,Card, Checkbox, Radio} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
// 路由守卫
import '@/router/router-guards'
import {permission} from "@/directives/permission";
import hasPermission from "@/utils/permission/hasPermission";
const app = createApp(App)

// app.config.globalProperties.$message = message
// 常用的ant-design-vue组件
app.component(Modal.name, Modal)
app.component(Table.name, Table)
app.component(Input.name, Input)
app.component(Input.Search.name, Input.Search)
app.component(Input.TextArea.name, Input.TextArea)
app.component('a-button', AButton)
app.use(Form)
app.use(Menu)
app.use(Checkbox)
app.use(Radio)
app.use(Card)

// 权限控制指令（演示）
app.directive('permission', permission)
app.use(hasPermission)

app.use(router)
app.use(store)

console.log(store)

router.isReady().then(() => app.mount('#app'))


