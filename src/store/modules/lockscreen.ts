import {Module} from 'vuex'
import {IS_LOCKSCREEN} from '@/store/mutation-types'

// 长时间不操作默认锁屏时间
const initTime = 60 * 60

const isLock = localStorage.getItem(IS_LOCKSCREEN)

const state = {
    isLock: isLock == 'true', // 是否锁屏
    lockTime: isLock == 'true' ? initTime : 0
}

type StateType = typeof state

const lockscreen: Module<StateType, any> = {
    namespaced: true,
    state,
    mutations: {
        setLock(state, payload: boolean) { // 设置锁屏
            state.isLock = payload
            localStorage.setItem(IS_LOCKSCREEN, state.isLock + '')
        },
        setLockTime(state, time = initTime) { // 设置锁屏时间，不传则为重置到默认时间
            state.lockTime = time
        }
    },
}

export default lockscreen
