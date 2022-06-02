/*
 * @Author: hidari
 * @Date: 2022-05-31 10:05:49
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 17:40:20
 * @FilePath: \vue3-integrated-back-office-solution\src\filter\index.js
 * @Description: "过滤器"封装主文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import dayjs from 'dayjs'
// 相对时间
import rt from 'dayjs/plugin/relativeTime'
// 语言包
import 'dayjs/locale/zh-cn'
import store from '@/store'

/**
 * dayjs转换时间戳
 * @param {*} val 时间戳
 * @param {*} format 格式
 * @returns
 */
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 如果可以被转成数字 就转成数字
  if (!isNaN(val)) val = parseInt(val)
  return dayjs(val).format(format)
}

// 加载相对时间插件
dayjs.extend(rt)
const relativeTime = (val) => {
  // 如果可以被转成数字 就转成数字
  if (!isNaN(val)) val = parseInt(val)
  // dayjs().to => 相对时间
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

/**
 * 统一导出
 */
export default app => {
  // app.config.globalProperties 挂载全局属性和方法
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
