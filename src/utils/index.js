/*
 * @Description: 工具类函数
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-28 15:39:23
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-06-18 17:40:58
 */

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 从缓存里获取数据
 * @param key
 * @return value
 */
export function getStorageSync (key) {
  return wx.getStorageSync(key)
}

/**
 * 显示加载中
 * @param data
 */
export function showLoading (data) {
  wx.showLoading(data)
}

/**
 * 隐藏加载中
 */
export function hideLoading () {
  wx.hideLoading()
}

/**
 * 将数据保存到缓存
 * @param key
 * @param value
 */
export function setStorageSync (key, value) {
  wx.setStorageSync(key, value)
}

export default {
  formatNumber,
  formatTime,
  getStorageSync,
  setStorageSync,
  showLoading,
  hideLoading
}
