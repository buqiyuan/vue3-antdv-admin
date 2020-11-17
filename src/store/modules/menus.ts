import {Module} from 'vuex'
import {adminMenus} from '@/api/system/menu'

const state = {
    authMenuList: [] // 授权的菜单列表
}

type StateType = typeof state

const menus: Module<StateType, any> = {
    namespaced: true,
    state,
    mutations: {
        setAuthMenuList(state, payload) {
            state.authMenuList = payload
        }
    },
    actions: {
        // 从服务器获取当前登录用户对应权限的菜单列表
        async getMenusList({commit}) {
            const result = await adminMenus()
            commit('setAuthMenuList', result || [])
        }
    }
}

export default menus
