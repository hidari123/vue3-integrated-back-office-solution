/*
 * @Author: hidari
 * @Date: 2022-05-31 14:06:19
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-31 15:47:03
 * @FilePath: \vue3-integrated-back-office-solution\src\views\import\utils.js
 * @Description: 上传数据格式转化
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
/**
 * 导入数据对应表
 */
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date)
  )
}
