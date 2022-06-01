/*
 * @Author: hidari
 * @Date: 2022-05-30 16:37:00
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 11:42:24
 * @FilePath: \vue3-integrated-back-office-solution\src\api\user-manager.js
 * @Description: 员工管理相关 api
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export const getUserManageList = params => request({
  url: '/user-manage/list',
  method: 'GET',
  params
})

/**
 * 批量上传
 * @param {*} data
 * @returns
 */
export const uploadUserBatchImport = data => request({
  url: '/user-manage/batch/import',
  method: 'POST',
  data
})

/**
 * 删除指定数据
 */
export const deleteUser = (id) => request({
  url: `/user-manage/detele/${id}`,
  method: 'DELETE'
})

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => request({
  url: '/user-manage/all-list'
})

/**
 * 获取用户详情
 */
export const getUserDetail = (id) => request({
  url: `/user-manage/detail/${id}`
})
