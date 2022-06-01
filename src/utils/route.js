/*
 * @Author: hidari
 * @Date: 2022-05-24 12:52:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 09:26:01
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\route.js
 * @Description: 路由表相关方法
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import path from 'path'

/**
 * 返回所有子路由
 * @param routes 需要处理的路由
 * @returns {*[]}
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes() (需要处理的路由)
 */
export const filterRouters = routes => {
  // 获取所有子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由查重
  return routes.filter(route => {
    // 根据 route 在 childrenRoutes 中查重 剔除重复路径
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 * @param data 需要判断的数据
 * @returns {boolean}
 */
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes (filterRoutes处理过的) 数据返回对应的 menu 规则数组
 * @param routes routes (filterRoutes处理过的) 数据
 * @param basePath 基础路径 默认为 ''
 * @returns {*[]}
 */
export function generateMenus (routes, basePath = '') {
  const result = []
  // 遍历路由表 不满足 meta && meta.title && meta.icon 的数据应该剔除
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children && 不存在 meta => 递归 generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      // generateMenus(route.children) 返回一个数组 push 到 result 中
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children && 存在 meta || 存在 children && 存在 meta
    // 因为最终要实现路由跳转 需要合并路由作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    // 当前路由未加入 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
