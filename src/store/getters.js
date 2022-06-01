/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 13:44:02
 * @FilePath: \vue3-integrated-back-office-solution\src\store\getters.js
 * @Description: 快捷访问
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

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
  cssVar: state => ({
    ...state.theme.variables,
    // 主题色
    // 对象中后面的对象key相同时会替换掉前面相同key的key值
    ...generateColors(getItem(MAIN_COLOR))
  }),
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
  language: state => state.app.language,
  /**
   * 主题色更换
   * @param {*} state
   * @returns
   */
  mainColor: state => state.theme.mainColor,

  /**
   * tags标签数组
   * @param {*} state
   * @returns
   */
  tagsViewList: state => state.app.tagsViewList,

  /**
   * 折线图数据
   * @param {*} state
   * @returns
   */
  lineChartData: state => state.lineChart.lineChartData,

  /**
   * todos列表
   * @param {*} state
   * @returns
   */
  todos: state => state.todo.todos
}

export default getters
