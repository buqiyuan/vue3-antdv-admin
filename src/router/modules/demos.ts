import {RouteRecordRaw} from 'vue-router'
import {RouterTransition} from '@/components/transition'

const routeName = 'demos'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/demos',
        name: routeName,
        redirect: '/demos/custom-a-custom-modal',
        component: RouterTransition,
        meta: {
            title: 'demo演示',
            icon: 'icon-zhuomian'
        },
        children: [
            {
                path: 'custom-a-custom-modal',
                name: `${routeName}-custom-modal`,
                meta: {
                    title: '自定义模态框',
                    icon: 'icon-zhuomian',
                },
                component: () => import(/* webpackChunkName: "demos-custom-a-custom-modal" */ '@/views/shared/demos/custom-modal.vue')
            },
            {
                path: 'button',
                name: `${routeName}-button`,
                meta: {
                    title: '按钮的扩展',
                    icon: 'icon-zhuomian',
                },
                component: () => import(/* webpackChunkName: "demos-button" */ '@/views/shared/demos/button.vue')
            },
        ]
    }
]

export default routes
