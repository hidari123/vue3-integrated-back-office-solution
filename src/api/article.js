/*
 * @Author: hidari
 * @Date: 2022-06-02 17:07:58
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-06 18:00:18
 * @FilePath: \vue3-integrated-back-office-solution\src\api\article.js
 * @Description: 文章相关接口
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取列表数据
 */
export const getArticleList = data => request({
  url: '/article/list',
  params: data
})

/**
 * 修改排序
 */
export const articleSort = data => request({
  url: '/article/sort',
  method: 'POST',
  data
})

/**
 * 删除文章
 */
export const deleteArticle = articleId => request({
  url: `/article/delete/${articleId}`
})

/**
 * 获取文章详情
 */
export const articleDetail = (articleId) => request({
  url: `/article/${articleId}`
})
