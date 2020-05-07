import axios from './axios'

export async function getUserData(config) {
  return await axios(config)
}

export async function getToken({ username, password }) {
  let data
  await axios({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password
    }
  }).then(res => {
    data = res
  }).catch(err => {
    data = err
  })
  if (data.token) {
    window.localStorage.setItem('token', 'Bearer ' + data.token)
  } else {
    window.localStorage.setItem('token', '')
    return data
  }
}