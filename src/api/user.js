/*
 * @Author: hidari
 * @Date: 2022-05-27 09:39:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 16:23:04
 * @FilePath: \vue3-integrated-back-office-solution\src\api\user.js
 * @Description: user相关api
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取项目功能
 * @returns
 */
export const feature = () => request({
  url: 'user/feature'
})

/**
 * 获取业务列表
 * @returns
 */
export const transactionList = () => request({
  url: '/transaction/list',
  method: 'get'
})
