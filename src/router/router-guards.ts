import {isNavigationFailure, Router} from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {createStorage} from '@/utils/Storage'

const Storage = createStorage()
import {debounce} from '@/utils/lodashChunk'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const allowList = ['login', 'icons', 'error', 'error-404'] // no redirect whitelist

const loginRoutePath = '/login'
const defaultRoutePath = '/dashboard'

// 是否需要从后端获取菜单
const isGetMenus = debounce(({to, from, next, hasRoute}) => {
    store.dispatch('async-router/GenerateRoutes').then(() => {
        // 根据roles权限生成可访问的路由表
        // 动态添加可访问路由表
        if (allowList.includes(to.name as string)) return

        if (!hasRoute) {
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent((from.query.redirect || '') as string)
            if (to.path === redirect) {
                next({...to, replace: true})
            } else {
                // 跳转到目的路由
                next({...to, replace: true})
            }
        }

    }).catch(() => next({path: defaultRoutePath}))
}, 1800, {leading: true})

export function createRouterGuards(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start() // start progress bar
        const token = Storage.get(ACCESS_TOKEN)
        if (token) {
            if (to.name === 'login') {
                next({path: defaultRoutePath})
                NProgress.done()
            } else {
                const hasRoute = router.hasRoute(to.name!)
                // 如果不需要每次切换路由获取最新的动态路由，可把下面注释放开
                // if (store.getters.addRouters.length === 0) {
                // generate dynamic router
                // 防抖获取菜单
                isGetMenus({to, from, next, hasRoute})

                if (allowList.includes(to.name as string) || hasRoute) {
                    // 在免登录名单，直接进入
                    next()
                }
                // } else {
                //     next()
                // }
            }
        } else {
            // not login
            if (allowList.includes(to.name as string)) {
                // 在免登录名单，直接进入
                next()
            } else {
                next({path: loginRoutePath, query: {redirect: to.fullPath}, replace: true})
                NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
            }
        }
    })

    router.afterEach((to, from, failure) => {
        if (isNavigationFailure(failure)) {
            console.log('failed navigation', failure)
        }
        NProgress.done() // finish progress bar
    })

    router.onError(error => {
        console.log(error, '路由错误')
    })

}
