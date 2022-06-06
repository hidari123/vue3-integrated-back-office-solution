/*
 * @Author: hidari
 * @Date: 2022-06-06 15:19:34
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-06 16:20:48
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-ranking\dynamic\index.js
 * @Description: 列数据相关内容
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
/**
 * 1. 动态的列数据
 */
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import DynamicData from './dynamicData'

// 暴露出动态列数据
export const dynamicData = ref(DynamicData())

// 切换语言时动态改变值
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel()
})

/**
 * 2. 被勾选的列数据
 */
// 创建 被勾选的动态列数据
export const selectDynamicData = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicData.value = dynamicData.value.map(item => item.label)
}
initSelectDynamicLabel()

/**
 * 3. 声明 table 的列数据
 */
export const tableColumns = ref([])
// 监听选中项的变化，根据选中项动态改变 table 列数据的值
watch(selectDynamicData, val => {
  tableColumns.value = []
  // 遍历列数据 判断当前列是否是被勾选的
  const selectData = dynamicData.value.filter(item => val.includes(item.label))

  tableColumns.value.push(...selectData)
}, {
  immediate: true
})
