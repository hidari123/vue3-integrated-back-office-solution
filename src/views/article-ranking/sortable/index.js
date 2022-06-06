/*
 * @Author: hidari
 * @Date: 2022-06-06 16:31:24
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-06 17:32:38
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-ranking\sortable\index.js
 * @Description: 拖拽相关业务
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
// 导入拖拽表格第三方包
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { ref } from 'vue'
import i18n from '@/i18n'

// 排序相关
export const tableRef = ref(null)

/**
 * 初始化排序
 * @param {*} tableData table响应式数据
 * @param {*} cb 完成排序后回调函数
 */
export const initSortable = (tableData, cb) => {
  // 设置拖拽效果
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__inner-wrapper > .el-table__body-wrapper >  .el-scrollbar > .el-scrollbar__wrap > .el-scrollbar__view > table > tbody'
  )[0]
  // 1. 要拖拽的元素
  // 2. 配置对象
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束后的回调方法
    async onEnd (event) {
      const { newIndex, oldIndex } = event
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success({
        message: i18n.global.t('msg.article.sortSuccess'),
        type: 'success'
      })

      // 直接重新获取数据无法刷新 table
      tableData.value = []
      // 重新获取数据
      console.log(cb)
      cb && cb()
    }
  })
}
