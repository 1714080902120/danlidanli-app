import axios from './axios'
import { COOKIE } from 'common/const.js'

// 获得顶部
export async function DynamicTop(teenagers_mode=0, cookie=COOKIE) {
  return await axios({
    url: '/user/get-dynamic-top',
    method: 'get',
    params: {
      teenagers_mode,
      cookie
    }
  })
}

// 获得顶部话题
export async function DynamicTopic(cookie=COOKIE) {
  return await axios({
    url: '/user/get-dynamic-topic',
    method: 'get',
    params: {
      cookie
    }
  })
}

// 获得关注人直播
export async function DynamicTopLive(size = 10, cookie=COOKIE) {
  return await axios({
    url: '/user/get-dynamic-top-live',
    method: 'get',
    params: {
      cookie,
      size
    }
  })
}

// 获得最新的
export async function DynamicNew(uid, current_dynamic_id = '', type_list=268435455, cookie=COOKIE) {
  return await axios({
    url: '/user/get-dynamic-new',
    method: 'get',
    params: {
      uid,
      current_dynamic_id,
      type_list,
      cookie
    }
  })
}

// 获得历史的
export async function DynamicHistory(uid, offset_dynamic_id = 0, type=268435455, cookie=COOKIE) {
  return await axios({
    url: '/user/get-dynamic-history',
    method: 'get',
    params: {
      uid,
      type,
      offset_dynamic_id,
      cookie
    }
  })
}

// 获得表情包
export async function DynamicEmoji(business='dynamic', cookie=COOKIE) {
  return await axios({
    url: '/user/get-dynamic-emoji',
    method: 'get',
    params: {
      business,
      cookie
    }
  })
}