/*
 * @Description: 文章API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-29 17:29:35
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-29 17:34:31
 */

import fly from '@/api/apiconfig'

export function getAllArts () {
  return fly.request('/getallart', null, { method: 'get' })
}
