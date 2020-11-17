import Vue from 'vue'
//
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
//
// Vue.use(Antd)
import { Button, message, notification, Modal, Radio, Input, FormModel, Badge, ConfigProvider, Tabs, Tag, Layout, Table, Select, Row, Col, Icon } from 'ant-design-vue'

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
Vue.use(Button)
Vue.use(Radio)
Vue.use(Input)
Vue.use(FormModel)
Vue.use(Badge)
Vue.use(ConfigProvider)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Table)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = message
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll
