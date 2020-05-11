import axios from './axios'

export async function getHomeSwipe() {
  return await axios({
    url: 'home/swipe',
    method: 'get'
  })
}

export async function getHomeData({ skip }) {
  return await axios({
    url: 'home/data',
    method: 'get',
    params: {
      skip
    }
  })
}