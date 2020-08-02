import axios from './axios'

// 请求首页推荐的轮播
export async function getHomeSwipe() {
  return await axios({
    url: 'home/swipe2',
    method: 'get'
  })
}

// 请求首页推荐的数据
export async function getHomeData({ skip }) {
  return await axios({
    url: 'home/data',
    method: 'get',
    params: {
      skip
    }
  })
}

// 请求直播模块的轮播
export async function getHomeLiveSwipe () {
  return await axios({
    url: 'live/swipe',
    method: 'get'
  })
}

// 请求直播的数据
export async function getHomeLiveData() {
  return await axios({
    url: 'home/live',
    method: 'get'
  })
}

// 请求直播模块的底部
export async function getHomeLiveFooter () {
  return await axios({
    url: 'live/footer',
    method: 'get'
  })
}

// 请求热门模块的数据
export async function getHomeHotData({ skip, rid }){
  return await axios({
    url: 'home/hot',
    method: 'get',
    params: {
      skip,
      rid
    }
  })

}

// 请求追番模块的数据
export async function getHomeAnimateData(rid, type, pn){
  return await axios({
    url: 'home/animate',
    method: 'get',
    params: {
      rid,
      type,
      pn
    }
  })

}