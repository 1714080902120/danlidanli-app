const mutations = {
  // 获取用户数据 在homeRecommend组件用到
  getUserInfo (state, payload) {
    state.userInfo = payload
  },
  // 改变state中的haveToken, 在registerAndLogin组件用到
  changeToken (state, payload) {
    state.haveToken = payload
  },
  // 打开侧边栏个人信息， 在Base组件用到
  openSideBar (state, payload) {
    state.openSideBar = payload
  },
  // 关闭侧边栏，在Sidebar组件用到
  closeSideBar (state, payload) {
    state.openSideBar = payload
  },
  // 改变左右滑动的值，在HomeRecommend等在同一navbar中的组件用到
  offSetX (state, payload) {
    state.offSetX = payload
  },
  // 当前处于活跃的navbar按钮的index，在HomeRecommend等在同一navbar中的组件用到
  offSetItem (state, payload) {
    state.offSetItem += payload
  },
  // 控制开启滑动，在HomeRecommend等在同一navbar中的组件用到
  offSetItemByClick (state, payload) {
    state.offSetItem = payload
  },
  // 控制下拉刷新组件是否开启， 在HomeRecommend等在同一navbar中的组件用到
  changeLoadingLockState (state, payload) {
    state.loadingLock = payload
  },
  logout (state) {
    state.userInfo = {}
  },
  getUuid (state, payload) {
    state.uuid = payload
  },
  // 修改头像
  changeLogo (state, payload) {
    state.userInfo.baseInfo.logo.src = payload
    state.userInfo.baseInfo.logo.name = ''
  },
  // 添加首页推荐数据
  addHomeRecommend (state, payload) {
    state.recommendList = payload
  },
  changeScreenState(state, payload) {
    state.isFullScreen = payload
  }
}

export default mutations