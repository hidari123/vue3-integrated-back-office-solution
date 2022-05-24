/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 15:25:58
 * @FilePath: \vue3-integrated-back-office-solution\src\views\login\rules.js
 * @Description: 通用校验规则
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import i18n from '@/i18n'

export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
