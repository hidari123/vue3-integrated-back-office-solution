/*
 * @Author: hidari
 * @Date: 2022-05-25 10:27:31
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 16:31:29
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\theme.js
 * @Description: 换肤功能仓库
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import variables from '@/styles/variables.scss'
export default {
  namespaced: true,
  state: () => ({
    // 主题色
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    // cssVar 变量
    variables
  }),
  mutations: {
    /**
       * 设置主题色
       * @param {*} state
       * @param {*} newColor 新的主题色
       */
    setMainColor (state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  },
  actions: {}
}
