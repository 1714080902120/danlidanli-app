import axios from './axios'
import $http from 'axios'


export async function getUserData() {
  return await axios({
    url: '/user/base-info',
    method: 'get'
  })
}
// 短信验证
export async function Send({ phoneNumber }) {
  return await axios({
    url: '/user/send',
    method: 'post',
    data: {
      phoneNumber
    }
  })
}

// 获取当前ip和地址
export async function City() {
  return $http.post('/apis/cityjson?ie=utf-8', {})
}


export async function Register({ username, password }) {
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
      getToken({ username, password }).catch(() => {
        data = -1
      })
    } else {
      data = res.err
    }
  })
  if (data === -2) {
    return Promise.reject('用户名已存在~')
  } else if (data === -1) {
    return Promise.reject('服务器炸了')
  } else {
    return Promise.resolve('注册成功')
  }
}
export async function sendMail({ mail }) {
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
    // return '登陆成功'
    return Promise.resolve('登陆成功')
  } else {
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('haveToken', false)
    // return '登陆失败'
    return Promise.reject('登陆失败')
  }
}

// 修改头像或者背景图 ,H5+上传的图片失败
export async function changeLogoOrBg(data) {
  alert(data)
  return await axios({
    url: '/user/upload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}