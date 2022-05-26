/*
 * @Author: hidari
 * @Date: 2022-05-26 09:32:28
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 09:57:08
 * @FilePath: \vue3-integrated-back-office-solution\src\components\headSearch\fuseData.js
 * @Description: 生成搜索需要的数据源
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import i18n from '@/i18n'
import path from 'path'

/**
 * 筛选出可供搜索的路由对象
 * @param {Array} routes filter整理出的路由数组表
 * @param {String} basePath 基础路径 默认为 /
 * @param {Array} prefixTitle 搜索展示的标题
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []

  // 循环遍历 routes
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在 mata 时 使用 i18n 进行国际化解析 组合成新的 title
    // 动态路由不允许被检索
    // 正则 判断动态路由 只要路径中包含冒号 就判定为动态路由
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      // 有title并且不是动态路由 用 i18n处理国际化
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }

    // 存在 children 迭代处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
