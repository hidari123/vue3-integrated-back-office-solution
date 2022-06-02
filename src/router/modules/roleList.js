/*
 * @Author: hidari
 * @Date: 2022-06-02 13:12:20
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 14:00:14
 * @FilePath: \vue3-integrated-back-office-solution\src\router\modules\roleList.js
 * @Description: roleList 路由表
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/role-list/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
