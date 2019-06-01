/*
 * @Description: API接口
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-29 17:29:35
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-31 23:58:42
 */

import fly from '@/api/apiconfig'

export function getAllArts (data) {
  return fly.request('/getallart', data, { method: 'post' })
}

export function getArtDetls (params) {
  return fly.request('/getartdeil/id', params, { method: 'get' })
}
