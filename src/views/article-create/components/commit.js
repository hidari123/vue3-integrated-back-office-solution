/*
 * @Author: hidari
 * @Date: 2022-06-07 11:14:14
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-07 11:46:14
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-create\components\commit.js
 * @Description: 处理提交事件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { articleEdit, createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const t = i18n.global.t

// 创建文章
export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

// 编辑文章
export const editArticle = async data => {
  const res = await articleEdit(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
