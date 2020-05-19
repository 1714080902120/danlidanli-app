import axios from './axios'

export async function getUserData() {
  return await axios({
    url: '/user/base-info',
    method: 'get'
  })
}


export async function Register ({ username, password }) {
  let data
  await axios({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password
    }
  }).then(res => {
    if (res.err === 0) {
      data = '注册成功'
      getToken({ username, password }).catch(err => {
        data = '服务器炸了'
        console.log(err)
      })
    } else {
      data = res.data
    }
  })
  return data
}
export async function sendMail ({ mail }) {
  return await axios({
    url: '/user/mail-check',
    method: 'post',
    data: {
      mail
    }
  })
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
    window.localStorage.setItem('haveToken', true)
    return '登陆成功'
  } else {
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('haveToken', false)
    return '登陆失败'
  }
}