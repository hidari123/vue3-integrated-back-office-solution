/*
 * @Author: hidari
 * @Date: 2022-05-30 15:02:10
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-30 15:34:43
 * @FilePath: \vue3-integrated-back-office-solution\src\directives\index.js
 * @Description: 自定义指令出口文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.directive('focus', {
  mounted (el) {
    // el.focus()
    console.log(el)
  }
})
app.mount('#app')
