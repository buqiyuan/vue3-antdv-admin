import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

//引入nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

import shared from './modules/shared'
import {errorRoutes, notFound} from './modules/error'
import common from "@/router/common";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/dashboard',
        component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
        meta: {
            title: '首页'
        },
        end: false,
        children: [
            ...common
        ]
    },
    ...shared,
    errorRoutes,
]

const router = createRouter({
    // process.env.BASE_URL
    history: createWebHashHistory(''),
    routes
})

// // 简单配置
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
//
// router.beforeEach((to,from,next) => {
//     NProgress.start()
//     next()
// })
//
// router.afterEach(() => {
//     NProgress.done()
// })

export default router
