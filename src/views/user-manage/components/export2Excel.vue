<!--
 * @Author: hidari
 * @Date: 2022-05-31 17:11:45
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 15:56:15
 * @FilePath: \vue3-integrated-back-office-solution\src\views\user-manage\components\export2Excel.vue
 * @Description: 导出 excel
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUserManageAllList } from '@/api/user-manager'
import { USER_RELATIONS } from './export2ExcelConstants'
import { dateFilter } from '@/filter'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 指定默认文件名
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据 => json 格式
  const allUser = (await getUserManageAllList()).list
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
    // 是否自动列宽 => 默认指定
    // 文件类型 => 默认指定
  })
  closed()
}

/**
 * 格式化 json 将数组转化成二维数组
 * 当使用 export_json_to_excel 的时候 传递的 data 数据 必须是一个二维数组
 * @param {*} headers 表格对应的中英文标题
 * @param {*} rows allUser数据源
 */
const formatJson = (headers, rows) => {
  // 一维
  // item => 每一条数据obj
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map(item => {
    // 二维
    return Object.keys(headers).map(key => {
      // 角色需要特殊处理
      if (headers[key] === 'role') {
        // headers[key] => USER_RELATIONS 的 key 值
        // item[headers[key]] => item 对应的 key 值
        const roles = item[headers[key]]
        // /\["|"]/g 去除 [""] 保留中间内容
        return JSON.stringify(roles.map(role => role.title)).replace(/\["|"]/g, '')
      }
      // 时间特殊处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      // key => USER_RELATIONS 的 key
      // headers[key] => USER_RELATIONS 的 key 值
      // item[headers[key]] => item 对应的 key 值
      return item[headers[key]]
    })
  })
}

/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}
</script>
