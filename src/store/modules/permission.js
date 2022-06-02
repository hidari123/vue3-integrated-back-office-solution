/*
 * @Author: hidari
 * @Date: 2022-06-02 13:05:02
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 16:25:52
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\permission.js
 * @Description: 权限相关模块
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    // 路由表： 初始时拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由
     * @param {*} state
     * @param {*} newRoutes 需要新增进去的路由
     */
    setRoutes (state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限数据筛选路由
     * @param {*} context
     * @param {*} menus 权限数据
     */
    filterRoutes ({ commit }, menus) {
      // 筛选之后获取到的需要通过 addRoute 进行添加的路由表数组
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push(
        // 所有不匹配的路由都会进入 404 的路由配置
        // 注意 该配置需要在所有路由指定之后
        // 本来应该写在 router/index.js 但是要保证在所有路由之后 加到动态路由后面
        {
          // 捕获不存在的路由 正则
          path: '/:catchAll(.*)',
          redirect: '/404'
        })
      commit('setRoutes', routes)

      return routes
    }
  }
}
