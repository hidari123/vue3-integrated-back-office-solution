/*
 * @Author: hidari
 * @Date: 2022-06-01 16:43:23
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 12:05:14
 * @FilePath: \vue3-integrated-back-office-solution\src\api\role.js
 * @Description: 角色相关 api
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取所有角色
 */

export const getRolesList = () => request({
  url: '/role/list'
})

/**
 * 获取所有权限
 */
export const getPermissionList = () => request({
  url: '/permission/list'
})

/**
 * 获取指定用户角色
 */
export const getUserRoles = (id) => request({
  url: `/user-manage/role/${id}`
})

/**
 * 分用户分配角色
 */
export const updateRole = (id, roles) => request({
  url: `/user-manage/update-role/${id}`,
  method: 'POST',
  data: {
    roles
  }
})

/**
 * 获取指定角色的权限
 */
export const rolePermission = (roleId) => request({
  url: `/role/permission/${roleId}`
})

/**
 * 为角色修改权限
 */
export const distributePermission = (data) => request({
  url: '/role/distribute-permission',
  method: 'POST',
  data
})
