const mutations = {
  getUserInfo (state, payload) {
    state.userInfo = payload
  },
  changeToken (state, payload) {
    state.haveToken = payload
  },
  popupUp (state, payload) {
    state.popupUp = payload
  }
}

export default mutations