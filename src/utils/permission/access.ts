import {App} from 'vue'
import store from '@/store'

/**
 * 第二种权限验证形式
 */

/**
 * @description 每一个服务模块的权限的名称做以下约定：
 * 'service.read'
 * 形如 '服务模块名称.权限'
 */

/**
 * 验证路由权限
 * @param route
 * @param accessMap
 */
export const validateAccess = (route, accessMap) => {
    const { meta } = route
    if (meta && meta.access) {
        return meta.access.every(access => !!accessMap[access])
    }

    if (meta && meta.optionalAccess) {
        return meta.optionalAccess.some(access => !!accessMap[access])
    }
}

/**
 * @description 按钮（元素）级权限控制，下面未在当前项目中实践，只提供一种做法
 */

/**
 * 是否有某个权限
 * @param access
 * @param accessMap
 */
export const hasAccess = (access, accessMap = store.getters['login/accessMap']) => {
    return !!accessMap[access]
}

/**
 * 是否包含指定的所有权限
 * @param accesses
 * @param accessMap
 */
export const hasEveryAccess = (accesses, accessMap = store.getters['login/accessMap']): boolean => {
    if (Array.isArray(accesses)) {
        return accesses.every(access => !!accessMap[access])
    }
    throw new Error(`[hasEveryAccess]: ${accesses} should be a array !`)
}

/**
 * 是否包含其中某个权限
 * @param accesses
 * @param accessMap
 */
export const hasSomeAccess = (accesses, accessMap = store.getters['login/accessMap']): boolean => {
    if (Array.isArray(accesses)) {
        return accesses.some(access => !!accessMap[access])
    }
    throw new Error(`[hasSomeAccess]: ${accesses} should be a array !`)
}

export default {
    install(app: App) {
        app.config.globalProperties.$_hasAccess = hasAccess
        app.config.globalProperties.$_hasEveryAccess = hasEveryAccess
        app.config.globalProperties.$_hasSomeAccess = hasSomeAccess

        /**
         * @description Support .some .every directive modifiers
         * @usage
         *    <element v-access="admin.device.read" />
         *    <element v-access.some="['admin.device.read']" />
         *    <element v-access.every="['admin.device.read']" />
         */
        app.directive('access', {
            mounted: function(el: HTMLElement, { value, modifiers }) {
                if (value === undefined)
                    throw new Error('[v-access]: should input an access list.')
                let isVerified = hasAccess(value)

                if (modifiers.some) {
                    isVerified = hasSomeAccess(Array.isArray(value) ? value : [value])
                }

                if (modifiers.every) {
                    isVerified = hasEveryAccess(Array.isArray(value) ? value : [value])
                }

                if (!isVerified) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            }
        })
    }
}
