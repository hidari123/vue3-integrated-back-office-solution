/*
 * @Author: hidari
 * @Date: 2022-05-26 12:56:58
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 18:37:00
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\tags.js
 * @Description: 筛选出需要展示 tags 的路由
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

// 创建白名单 不希望被保存
const whiteList = ['/login', '/404', '401']
/**
 * 是否需要被缓存
 * @param {*} path 路径
 * @returns
 */
export const isTags = (path) => {
  // 如果在白名单中 不需要保存
  return !whiteList.includes(path)
}
