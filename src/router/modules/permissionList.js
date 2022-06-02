/*
 * @Author: hidari
 * @Date: 2022-06-02 13:12:30
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 14:01:48
 * @FilePath: \vue3-integrated-back-office-solution\src\router\modules\permissionList.js
 * @Description: permissionList路由表
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      component: () => import('@/views/permission-list/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
