import {Module} from 'vuex'
import {TABS_ROUTES} from '@/store/mutation-types'

interface RouteItem {
    fullPath: string;
    hash?: any;
    meta?: any;
    name?: string;
    params?: any;
    path?: string;
    query?: any;
}
// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login']

const state = {
    tabsList: [] as RouteItem[] // 标签页
}

type StateType = typeof state

const menus: Module<StateType, any> = {
    namespaced: true,
    state,
    mutations: {
        initTabs(state, routes){ // 初始化标签页
            state.tabsList = routes
        },
        addTabs(state, route): boolean { // 添加标签页
            if (whiteList.includes(route.name)) return false
            const isExists = state.tabsList.some(item => item.fullPath == route.fullPath)
            if (!isExists){
                state.tabsList.push(route)
            }
            return true
        },
         closeLeftTabs(state, route) { // 关闭左侧
            const index = state.tabsList.findIndex(item => item.fullPath == route.fullPath)
            state.tabsList.splice(0, index)
        },
        closeRightTabs(state, route) {// 关闭右侧
            const index = state.tabsList.findIndex(item => item.fullPath == route.fullPath)
            state.tabsList.splice(index + 1)
        },
        closeOtherTabs(state, route) {// 关闭其他
            state.tabsList = state.tabsList.filter(item => item.fullPath == route.fullPath)
        },
        closeCurrentTabs(state, route) {// 关闭当前页
            const index = state.tabsList.findIndex(item => item.fullPath == route.fullPath)
            state.tabsList.splice(index, 1)
        },
        closeAllTabs(state) {// 关闭全部
            state.tabsList = []
            localStorage.removeItem(TABS_ROUTES)
        }
    }
}

export default menus
