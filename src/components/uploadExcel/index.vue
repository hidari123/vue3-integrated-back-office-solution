<!--
 * @Author: hidari
 * @Date: 2022-05-31 10:35:51
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-31 15:15:47
 * @FilePath: \vue3-integrated-back-office-solution\src\components\uploadExcel\index.vue
 * @Description: 导入相关逻辑
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <!--
    drop (en-US)：当元素或选中的文本在可释放目标上被释放时触发
    dragover (en-US)：当元素或选中的文本被拖到一个可释放目标上时触发
    dragenter (en-US)：当拖拽元素或选中的文本到一个可释放目标时触发
    -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon><Upload /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import XLSX from 'xlsx'
import { ElMessage } from 'element-plus/lib/components'
const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})

// 点击上传触发

const loading = ref(false)
const excelUploadInput = ref(null)
// 上传点击事件
const handleUpload = () => {
  // 触发隐藏域点击事件
  excelUploadInput.value.click()
}
// 选中文件后的回调事件
const handleChange = (e) => {
  // 获取用户选中的文件
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  // 上传文件
  upload(rawFile)
}

/**
 * 触发上传事件
 * @param rawFile 要上传的文件
 */
const upload = rawFile => {
  // 置空选中的文件
  excelUploadInput.value.value = null
  // 用户没有指定上传前回调 直接读取数据
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }

  // 用户指定上传前回调 只有返回 true(回调执行完毕) 后 执行相应的后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据(异步)
 * @param rawFile 要读取的文件
 */
const readerData = (rawFile) => {
  // 开始 loading
  loading.value = true
  return new Promise((resolve, reject) => {
    // FileReader => 异步读取计算机上的文件
    const reader = new FileReader()

    // 读取操作完成时触发 读取来的文件会被回调到 onload 中 异步操作
    reader.onload = e => {
      // 1. 获取到解析后的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet1(第一张表格) 的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传入解析后的数据
      generateData({ header, results })
      // 8. 处理 loading
      loading.value = false
      // 9. 成功回调
      resolve()
    }

    // 读取传递来的文件 异步
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入内容生成数据
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  // 上传中跳过
  if (loading.value) return
  // 获取到上传的文件
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  // 用户可能会拖拽任意文件 判断是否是需要的文件
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = e => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
