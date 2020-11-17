import { createStore } from 'vuex'
import getters from "@/store/getters";
import modules from '@/store/modules'

export default createStore({
  state: {
    testName: 'hello'
  },
  mutations: {
    setTestName(state, name) {
      state.testName = name
    }
  },
  actions: {
  },
  modules,
  getters
})
