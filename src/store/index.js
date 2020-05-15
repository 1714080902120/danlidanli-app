import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    haveToken: window.localStorage.getItem('haveToken'),
    openSideBar: false,
    offSetX: 0,
    offSetItem: 1
  },
  mutations,
  actions,
  modules
})
