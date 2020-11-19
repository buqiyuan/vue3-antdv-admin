import {markRaw} from 'vue'
import {RouteRecordRaw} from 'vue-router'
import {RouterTransition} from '@/components/transition'
import {h} from 'vue'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [{
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/welcome',
    component: h(markRaw(RouterTransition), {notNeedKey: true}),
    meta: {
        title: '系统看板',
        icon: 'icon-yibiaopan'
    },
    children: [
        {
            path: 'welcome',
            name: `${routeName}-welcome`,
            meta: {
                title: '首页',
                icon: 'icon-shouye',
            },
            component: () => import(/* webpackChunkName: "dashboard-welcome" */ '@/views/shared/dashboard/welcome/index.vue')
        },
        ]
}]

export default routes
