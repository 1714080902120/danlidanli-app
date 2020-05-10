const mutations = {
  getUserInfo (state, payload) {
    state.userInfo = payload
  },
  changeToken (state, payload) {
    state.haveToken = payload
  }
}

export default mutations