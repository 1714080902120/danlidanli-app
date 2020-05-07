const actions = {
  getUserInfoByActions({ commit }, payload) {
    let { userInfo } = payload
    if (!userInfo) {
      userInfo = {
        "baseInfo": {
          "logo": {
            "name": "bilibili_user_logo_bg.svg",
            "src": "~assets/img/base/",
            "href": ""
          },
          "name": "请先登录",
        },
        "cardList": []
      }
    }
    commit('getUserInfo', { userInfo })
  }
}

export default actions