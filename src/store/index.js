/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 10:47:46
 * @FilePath: \vue3-integrated-back-office-solution\src\store\index.js
 * @Description: 仓库主文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme
  }
})
