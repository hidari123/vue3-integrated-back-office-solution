/*
 * @Author: hidari
 * @Date: 2022-05-24 12:52:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 09:25:14
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\auth.js
 * @Description: 判断token是否过期
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import { getItem, setItem } from '@/utils/storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

/**
 * 获取时间戳
 */
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 * @returns true => 超时
 */
export function isCheckTimeout () {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
