/*
 * @Author: hidari
 * @Date: 2022-06-02 13:12:41
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 13:17:54
 * @FilePath: \vue3-integrated-back-office-solution\src\router\modules\articleRanking.js
 * @Description: articleRanking 路由表
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking/index'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/article-detail/index'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
