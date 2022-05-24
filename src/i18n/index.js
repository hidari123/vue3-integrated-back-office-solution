/*
 * @Author: hidari
 * @Date: 2022-05-24 13:11:18
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 15:42:38
 * @FilePath: \vue3-integrated-back-office-solution\src\i18n\index.js
 * @Description: i18n 国际化使用
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'

// message数据源
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

// 语言变量
/**
 * 返回当前 lang
 */
const getLanguage = () => {
  return store && store.getters && store.getters.language
}

// 初始化 i18n 实例
const i18n = createI18n({
  // 使用 composition API
  legacy: false, // 让 setup 函数可以通过 t 访问
  // 全局使用 t 函数
  globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
  locale: getLanguage(), // 切换 zh en 控制展示文字
  messages
})

export default i18n
