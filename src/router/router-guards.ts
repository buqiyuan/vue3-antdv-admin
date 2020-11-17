import router from './index'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
// import '@/components/NProgress/nprogress.less'
import {notification} from 'ant-design-vue'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {createStorage} from '@/utils/Storage'
const Storage = createStorage()

NProgress.configure({showSpinner: false}) // NProgress Configuration

const allowList = ['login', 'icons', 'error', 'error-404'] // no redirect whitelist
const loginRoutePath = '/login'
const defaultRoutePath = '/dashboard'
router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    const token = Storage.get(ACCESS_TOKEN)
    if (token) {
        if (to.name === 'login') {
            next({path: defaultRoutePath})
            // next()
            NProgress.done()
        } else {
            if (store.getters.addRouters.length === 0) {
                // generate dynamic router
                store.dispatch('async-router/GenerateRoutes').then(() => {
                    // 根据roles权限生成可访问的路由表
                    // 动态添加可访问路由表
                    // router.addRoute(store.getters.addRouters)
                    // 请求带有 redirect 重定向时，登录自动重定向到该地址
                    const redirect = decodeURIComponent((from.query.redirect || to.path) as string)
                    if (to.path === redirect) {
                        // set the replace: true so the navigation will not leave a history record
                        next({...to, replace: true})
                        // next('/strategy/license')
                    } else {
                        // 跳转到目的路由
                        next({path: redirect})
                    }
                })
                if (allowList.includes(to.name as string)) {
                    // 在免登录名单，直接进入
                    next()
                }
            } else {
                next()
            }
        }
    } else {
        // not login
        if (allowList.includes(to.name as string)) {
            // 在免登录名单，直接进入
            next()
        } else {
            next({path: loginRoutePath, query: {redirect: to.fullPath}})
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

router.onError(error => {
    console.log(error, '路由错误')
})
