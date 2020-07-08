import axios from './axios'

export async function assess (bvid, pn) {
  return await axios({
    url: '/up/assess',
    params: {
      bvid,
      pn
    }
  })
}

export async function allDanmakuData (bvid) {
  return await axios({
    url: '/up/danmaku',
    method: 'get',
    params: {
      bvid
    }
  })
}