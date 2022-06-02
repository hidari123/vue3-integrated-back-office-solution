/*
 * @Author: hidari
 * @Date: 2022-06-02 17:07:58
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 17:08:02
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
