/*
 * @Description: API接口
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-29 17:29:35
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-30 20:55:56
 */

import fly from '@/api/apiconfig'

export function getAllArts () {
  return fly.request('/getallart', null, { method: 'get' })
}

// export function getAllArts (data) {
//   return fly.request('/getallart', data, { method: 'post' })
// }
