/*
 * @Author: hidari
 * @Date: 2022-06-02 13:12:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 13:15:39
 * @FilePath: \vue3-integrated-back-office-solution\src\router\modules\userManage.js
 * @Description: userManage 路由表
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
