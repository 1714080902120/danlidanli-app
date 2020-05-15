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
  },
  offSetX (state, payload) {
    state.offSetX = payload
  },
  offSetItem (state, payload) {
    state.offSetItem += payload
  },
  offSetItemByClick (state, payload) {
    state.offSetItem = payload
  }
}

export default mutations