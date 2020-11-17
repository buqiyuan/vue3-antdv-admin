import router from '@/router'
import {App} from "vue";

/**
 * 第一种权限验证形式
 */

/**
 * 判断是否拥有某种权限
 * @param {string} action
 * @param {boolean} include
 */
export const hasPermission = (action: string, include = false) => {
    const currentRoute = router.currentRoute.value

    // 下面只是为了方便演示，不建议这么做
    action = currentRoute.path.split('/').filter(m => m.trim() != '').join('.') + '.' + action
    // console.log(action, currentRoute.meta.permission, '当前路由权限')
    return currentRoute.meta.permission.includes(action)

    // const permissions = currentRoute.meta.permission || []
    // if (include) {
    //     return permissions.some(item => item.action.includes(action))
    // } else {
    //     return permissions.some(item => item.action == action)
    // }
}

// 暴露一个插件 API
const install = (app: App) => {
    // 在 this 上挂载一个贯穿方法，用 provider 也行
    app.config.globalProperties.$hasPermission = hasPermission
}
export default install
