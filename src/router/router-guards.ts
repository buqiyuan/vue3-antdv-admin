import {isNavigationFailure} from 'vue-router'
import router, {routes} from './index'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {createStorage} from '@/utils/Storage'
const Storage = createStorage()

NProgress.configure({showSpinner: false}) // NProgress Configuration

const allowList = ['login', 'icons', 'error', 'error-404'] // no redirect whitelist

// const getNames = (routes) => {
//     routes.forEach(item => {
//         allowList.push(item.name)
//         if (item?.children?.length > 0) {
//             getNames(item.children)
//         }
//     })
// }
// getNames(common)

console.log(allowList, '白名单列表')

const loginRoutePath = '/login'
const defaultRoutePath = '/dashboard'
router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    const token = Storage.get(ACCESS_TOKEN)
    if (token) {
        if (to.name === 'login') {
            next({path: defaultRoutePath})
            NProgress.done()
        } else {
            const hasRoute = router.hasRoute(to.name!)
            // if (store.getters.addRouters.length === 0) {
                // generate dynamic router
                store.dispatch('async-router/GenerateRoutes').then(async () => {

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
                           next()
                           setTimeout(() => router.replace({...to}))
                       }
                   }

                })
                if (allowList.includes(to.name as string) || hasRoute) {
                    // 在免登录名单，直接进入
                    next()
                }
            // } else {
            //     next()
            // }
        }
    } else {
        console.log(to.name, 'what h')
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
