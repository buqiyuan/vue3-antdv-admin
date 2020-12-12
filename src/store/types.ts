import { UserStateType } from '@/store/modules/user'

// vuex state 的模块的类型
type ModuleType = {
    user: UserStateType;
}

// 所有的StateType
export type StateType = ModuleType
