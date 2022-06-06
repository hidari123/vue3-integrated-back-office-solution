/*
 * @Author: hidari
 * @Date: 2022-06-06 15:15:46
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-06 16:00:02
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-ranking\dynamic\dynamicData.js
 * @Description: 指定初始列数据
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import i18n from '@/i18n'

const t = i18n.global.t

// 返回一个函数
// 这样可以在语言发生切换时调用函数获取返回值
// 静态数组无法改变值
export default () => [
  {
    label: t('msg.article.ranking'),
    prop: 'ranking'
  },
  {
    label: t('msg.article.title'),
    prop: 'title'
  },
  {
    label: t('msg.article.author'),
    prop: 'author'
  },
  {
    label: t('msg.article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: t('msg.article.desc'),
    prop: 'desc'
  },
  {
    label: t('msg.article.action'),
    prop: 'action'
  }
]
