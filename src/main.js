/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 13:20:14
 * @FilePath: \vue3-integrated-back-office-solution\src\main.js
 * @Description: 主入口文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { createApp } from 'vue'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './promission.js'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app
  .use(store)
  .use(router)
  // 注册 i18n
  .use(i18n)
  .mount('#app')
