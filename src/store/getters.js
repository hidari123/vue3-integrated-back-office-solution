/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 13:48:13
 * @FilePath: \vue3-integrated-back-office-solution\src\store\getters.js
 * @Description: 快捷访问
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import variables from '@/styles/variables.scss'

const getters = {
  /**
   * 取出 token
   * @param state
   * @returns {*}
   */
  token: state => state.user.token,

  /**
   * 判断用户信息是否存在
   * @param state
   * @returns true => 用户信息已存在
   */
  hasUserInfo: state => {
    // 因为userInfo是对象格式 不能直接取出判断 现转化为字符串 再判断
    return JSON.stringify(state.user.userInfo) !== '{}'
  },

  /**
   * 用户信息
   * @param state
   * @returns {{}}
   */
  userInfo: state => state.user.userInfo,

  /**
   * variables 主题样式变量
   * @param state
   * @returns {*}
   */
  cssVar: state => variables,
  /**
   * 左侧菜单伸缩状态
   * @param {*} state
   * @returns
   */
  sidebarOpened: state => state.app.sidebarOpened,
  /**
   * 中英文状态
   * @param {*} state
   * @returns
   */
  language: state => state.app.language
}

export default getters
