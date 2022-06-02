/*
 * @Author: hidari
 * @Date: 2022-05-30 15:02:10
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 15:14:35
 * @FilePath: \vue3-integrated-back-office-solution\src\directives\index.js
 * @Description: 自定义指令出口文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

// 打印 => 第三方包
import print from 'vue3-print-nb'
import permission from './permission'
import focus from './focus'

export default app => {
  app.use(print)
  app.directive('focus', focus)
  app.directive('permission', permission)
}
