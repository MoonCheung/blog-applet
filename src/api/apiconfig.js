/*
 * @Description: 公共API配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-28 15:39:23
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-31 00:38:25
 */

import {
  getStorageSync,
  hideLoading,
  showLoading,
  showNotify
} from '../utils/index'

const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// 设置超时
fly.config.timeout = 7000
// 定义公共配置
// fly.config.headers = { 'x-tag': 'flyio' }
fly.config.baseURL = 'http://127.0.0.1:3030/api/'

// 添加请求拦截器
fly.interceptors.request.use(
  req => {
    return req
  },
  error => {
    Promise.reject(error)
  }
)
// 添加响应拦截器
fly.interceptors.response.use(
  res => {
    // 同意处理一些响应的code状态
    // do sthing
    // 只将请求结果的data字段返回
    return res.data
  },
  error => {
    // 发生网络错误后会走到这里
    console.log(error)
  }
)

export default fly
