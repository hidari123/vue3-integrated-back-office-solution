/*
 * @Author: hidari
 * @Date: 2022-05-24 12:52:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 11:29:38
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\i18n.js
 * @Description: i18n相关函数
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

/**
 * 切换左侧菜单中英文显示
 * @param {*} title 菜单 title
 * @returns
 */
export const generateTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 监听语言变化 同时执行回调函数
 * @param  {...any} cbs 回调函数（可以多个）
 */
export const watchSwitchLang = (...cbs) => {
  watch(() => store.getters.language,
    () => {
      // 遍历执行回调函数 传入语言
      cbs.forEach(cb => cb(store.getters.language))
    })
}
