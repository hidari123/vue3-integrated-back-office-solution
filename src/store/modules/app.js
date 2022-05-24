/*
 * @Author: hidari
 * @Date: 2022-05-24 09:52:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 13:25:06
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\app.js
 * @Description: 左侧菜单伸缩功能 store
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // sidebar是否打开
    sidebarOpened: true,
    // 需要展示的语言
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    /**
       * 控制打开/关闭sidebar
       * @param {*} state
       */
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 改变需要展示的语言
     * @param {*} state
     * @param {*} lang 需要展示的语言
     */
    setLanguage (state, lang) {
      // 数据持久化
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
