const mutations = {
  getUserInfo (state, payload) {
    state.userInfo = payload.userInfo
  },
  changeToken (state, payload) {
    state.haveToken = payload
  }
}

export default mutations