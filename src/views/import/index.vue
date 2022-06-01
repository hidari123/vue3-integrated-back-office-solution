<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-31 15:48:58
 * @FilePath: \vue3-integrated-back-office-solution\src\views\import\index.vue
 * @Description: 导入excel
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <upload-excel :onSuccess="onSuccess"/>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/uploadExcel'
import { formatDate, USER_RELATIONS } from './utils'
import { uploadUserBatchImport } from '@/api/user-manager'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const i18n = useI18n()

/**
 * 成功的回调函数
 */
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  console.log(updateData)
  await uploadUserBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      // 单独处理 openTime 格式
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      // 把 USER_RELATIONS[key] 的 值当作 userInfo 的 key
      // item[key] 作为 userInfo 的 key值
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
