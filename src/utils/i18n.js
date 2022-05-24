/*
 * @Author: hidari
 * @Date: 2022-05-24 12:52:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 15:52:13
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\i18n.js
 * @Description: 切换左侧菜单中英文显示
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import i18n from '@/i18n'
const generateTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}

export default generateTitle
