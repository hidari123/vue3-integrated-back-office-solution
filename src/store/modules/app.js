/*
 * @Author: hidari
 * @Date: 2022-05-24 09:52:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 11:17:05
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\app.js
 * @Description: 左侧菜单伸缩功能 store
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
export default {
  namespaced: true,
  state: () => ({
    // sidebar是否打开
    sidebarOpened: true
  }),
  mutations: {
    /**
       * 控制打开/关闭sidebar
       * @param {*} state
       */
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
