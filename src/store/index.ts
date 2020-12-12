import { createStore } from 'vuex'
import getters from "@/store/getters";
import modules from '@/store/modules'
import {App} from "vue";

const store = createStore({
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

export function setupStore (app: App) {
  app.use(store)
  console.log(store, 'vuex')
}

export default store
