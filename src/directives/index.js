/*
 * @Author: hidari
 * @Date: 2022-05-30 15:02:10
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 14:26:47
 * @FilePath: \vue3-integrated-back-office-solution\src\directives\index.js
 * @Description: 自定义指令出口文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

// 打印 => 第三方包
import print from 'vue3-print-nb'

// 自定义指令 focus
const focus = (el, { value }) => {
  if (value) {
    el.focus()
  }
}

export default app => {
  app.use(print)
  app.directive('focus', focus)
}
