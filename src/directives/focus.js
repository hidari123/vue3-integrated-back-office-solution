/*
 * @Author: hidari
 * @Date: 2022-06-02 14:50:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 16:44:31
 * @FilePath: \vue3-integrated-back-office-solution\src\directives\focus.js
 * @Description: 自定义指令 focus
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
const focus = (el, { value }) => {
  if (value) {
    el.focus()
  }
}

export default focus
