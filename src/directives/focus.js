/*
 * @Author: hidari
 * @Date: 2022-05-30 15:02:30
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-30 15:15:07
 * @FilePath: \vue3-integrated-back-office-solution\src\directives\focus.js
 * @Description: v-focus 自定义指令
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

// 注册一个全局自定义指令 `v-focus`

export default function focus (el, { value }, { context }) {
  if (value) {
    context.$nextTick(() => {
      el.focus()
    })
  }
}
