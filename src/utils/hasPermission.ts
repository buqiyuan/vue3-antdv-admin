import router from '@/router'
import {App} from "vue";

/**
 * 判断是否拥有某种权限
 * @param {string} action
 * @param {boolean} include
 */
export const hasPermission = (action: string, include = false) => {
    const permissions = router.currentRoute.value.meta.permission || []
    if (include) {
        return permissions.some(item => item.action.includes(action))
    } else {
        return permissions.some(item => item.action == action)
    }
}

// 暴露一个插件 API
const install = (app: App) => {
    // 在 this 上挂载一个贯穿方法，用 provider 也行
    app.config.globalProperties.$hasPermission = hasPermission
}
export default install
