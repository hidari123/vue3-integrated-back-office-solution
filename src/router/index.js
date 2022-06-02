/*
 * @Author: hidari
 * @Date: 2022-05-24 12:52:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 16:23:29
 * @FilePath: \vue3-integrated-back-office-solution\src\router\index.js
 * @Description: 路由入口文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import ArticleCreaterRouter from './modules/articleCreate'
import ArticleRouter from './modules/article'
import PermissionListRouter from './modules/permissionList'
import RoleListRouter from './modules/roleList'
import UserManageRouter from './modules/userManage'
import layout from '@/layout'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export const resetRouter = () => {
  if (
    store.getters.userInfo &&
        store.getters.userInfo.permission &&
        store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
