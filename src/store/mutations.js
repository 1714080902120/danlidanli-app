const mutations = {
  getUserInfo (state, payload) {
    state.userInfo = payload
  },
  changeToken (state, payload) {
    state.haveToken = payload
  },
  openSideBar (state, payload) {
    state.openSideBar = payload
  },
  closeSideBar (state, payload) {
    state.openSideBar = payload
  }
}

export default mutations