/*
 * @Author: hidari
 * @Date: 2022-05-20 12:52:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 09:26:28
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\storage.js
 * @Description: 存储数据
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

export const setItem = (key, value) => {
  // value 分为两种情况
  // 1. 复杂数据类型
  // 2. 基本数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 读取数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  // 用 if 判断是否为复杂类型的字符串形势比较麻烦 用 try catch
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
