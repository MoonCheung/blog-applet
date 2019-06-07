/*
 * @Description: API接口
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-29 17:29:35
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-06-05 20:40:33
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
