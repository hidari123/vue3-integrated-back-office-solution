/*
 * @Author: hidari
 * @Date: 2022-06-02 13:13:01
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 13:18:01
 * @FilePath: \vue3-integrated-back-office-solution\src\router\modules\articleCreate.js
 * @Description: articleCreate 路由表
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleCreate',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/create',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
