import {RouteRecordRaw} from 'vue-router'
import {RouterTransition} from '@/components/transition'
import {markRaw} from "vue";

const routes: Array<RouteRecordRaw> = [{
    path: '/redirect/:path*',
    name: 'Redirect',
    component: markRaw(RouterTransition),
    meta: {
        title: '重定向',
        icon: 'SettingOutlined',
        hidden: true,
    },
    children: [
        {
            path: '',
            name: 'Redirect',
            component: require('@/views/shared/redirect/index.vue').default,
            meta: {
                title: '重定向',
                hidden: true,
                keepAlive: false
            },
        }
    ]
}]

export default routes
