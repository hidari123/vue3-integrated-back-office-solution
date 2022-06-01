/*
 * @Author: hidari
 * @Date: 2022-05-15 12:56:58
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 09:27:07
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\validate.js
 * @Description: 判断是否为外部资源
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

export const isExternal = (path) => {
  return /^(http?:|mailto:|tel:)/.test(path)
}
