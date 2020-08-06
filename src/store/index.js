import Vue from 'vue'
import Vuex from 'vuex'
import add_new_hosue_report_store from './newHouseRportStore/add_new_hosue_report_store'
import common_store from './common_store/common_store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    add_new_hosue_report_store, common_store
  }, 
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
