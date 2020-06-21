import axios from './axios'

export async function getUpDetail(uuid) {
  return axios({
    url: '/up/data',
    method: 'get',
    params: {
      uuid
    }
  })
}