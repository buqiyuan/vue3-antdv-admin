import type { App } from 'vue';

import {AButton} from '@/components/button/'

import {Modal, Table, Menu, Input, Form,Card, Checkbox, Radio} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
    app.component('a-button', AButton)

    app.use(Form)
        .use(Input)
        .use(Modal)
        .use(Table)
        .use(Menu)
        .use(Card)
        .use(Checkbox)
        .use(Radio);
}
