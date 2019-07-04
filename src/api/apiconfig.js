/*
 * @Description: 公共API配置
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-28 15:39:23
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-07-04 00:05:46
 */

const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// 设置超时
fly.config.timeout = 7000

// 根据环境平台返回接口url
const PROD_SERVIC = 'https://api.ikmoons.com/api/'
const DEV_SERVIC = 'http://127.0.0.1:3030/api/'

if (process.env.NODE_ENV === 'production') {
  fly.config.baseURL = PROD_SERVIC
} else {
  fly.config.baseURL = DEV_SERVIC
}

// 添加请求拦截器
fly.interceptors.request.use(
  req => {
    return req
  },
  error => {
    console.error('请求拦截器:', error)
    return Promise.reject(error)
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
    console.error('响应拦截器:', error)
    return Promise.resolve(error)
  }
)

export default fly
