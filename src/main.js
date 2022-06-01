/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 14:27:00
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
// 引入 element-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局属性
import installFilter from '@/filter'
// 自定义指令
import installDirective from '@/directives'

const app = createApp(App)

// 导入所有图标并全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app
  .use(store)
  .use(router)
  // 注册 i18n
  .use(i18n)
  .mount('#app')
