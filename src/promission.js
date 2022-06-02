/*
 * @Author: lijiaying 1640106564@qq.com
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 14:02:17
 * @FilePath: \vue3-integrated-back-office-solution\src\promission.js
 * @Description: 权限管理
 */
// 路由守卫
import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 1. 用户已登录 => 不允许进入 login
  // 2. 用户未登录 => 只允许进入 login
  if (store.getters.token) {
    // 1. 用户已登录 => 不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限 筛选出需要添加的路由
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        // 循环添加动态路由
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由后需要进行一次主动跳转 这样添加的路由才能生效
        return next(to.path)
      }
      next()
    }
  } else {
    // 2. 用户未登录 => 只允许进入 login
    // 在白名单中 => 直接通过
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
