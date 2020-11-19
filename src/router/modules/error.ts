import {RouteRecordRaw} from 'vue-router'
import {RouterTransition} from '@/components/transition'
import {markRaw} from "vue";

const routeName = 'error'

export const notFound = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
}

export const errorRoutes = {
    path: '/error',
    name: routeName,
    redirect: '/error/404',
    component: markRaw(RouterTransition),
    meta: {
        title: '错误页',
        icon: 'EditOutlined',
        hidden: true
    },
    children: [
        {
            path: '404',
            name: `${routeName}-404`,
            meta: {
                title: '404',
                icon: 'UserOutlined'
            },
            component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
        }
    ]
}
