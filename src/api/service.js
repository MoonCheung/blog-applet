/*
 * @Description: API接口
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-06-09 14:53:06
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-06-10 21:41:06
 */

import fly from '@/api/apiconfig'

export function getAllArts (data) {
  return fly.request('/art/getallart', data, { method: 'post' })
}

export function getArtDetls (params) {
  return fly.request('/getartdeil/id', params, { method: 'get' })
}

export function getCatgLists () {
  return fly.request('/catg/catglist', null, { method: 'get' })
}

export function getApptCatgLists (data) {
  return fly.request('/art/apptcatg', data, { method: 'post' })
}

export function addLikeArt (data) {
  return fly.request('/art/addlike', data, { method: 'post' })
}

export function delLikeArt (data) {
  return fly.request('/art/dellike', data, { method: 'post' })
}
