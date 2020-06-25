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