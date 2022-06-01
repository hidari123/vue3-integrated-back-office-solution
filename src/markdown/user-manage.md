<!--
 * @Author: hidari
 * @Date: 2022-06-01 14:49:58
 * @LastEditors: hidari 
 * @LastEditTime: 2022-06-01 16:11:47
 * @FilePath: \vue3-integrated-back-office-solution\src\markdown\user-manage.md
 * @Description: 员工管理模块
 * 
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved. 
-->
# 员工管理模块

整个 **员工管理** 模块可以分为以下功能：

1. 用户列表分页展示
2. `excel` 导入用户
3. 用户列表导出为 `excel`
4. 用户详情的表格展示
5. 用户详情表格打印
6. 用户删除
7. 用户角色分配（需要在完成角色列表之后处理）

## 用户列表分页展示

整个功能大体可以分为两步：

1. 获取分页数据
2. 利用 [el-table](https://element-plus.org/zh-CN/component/table.html) 和 [el-pagination](https://element-plus.org/zh-CN/component/pagination.html) 渲染数据

实现：

1. 创建 `api/user-manage` 文件，用于定义接口
```js
import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export const getUserManageList = params => request({
  url: '/user-manage/list',
  method: 'GET',
  params
})
```

2. 在 `user-manage` 中获取对应数据

```vue
<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
    const result = await getUserManageList({
    page: page.value,
    size: size.value
    })
    tableData.value = result.list
    total.value = result.total
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)
</script>
```

3. 根据数据利用 [el-table](https://element-plus.org/zh-CN/component/table.html) 和 [el-pagination](https://element-plus.org/zh-CN/component/pagination.html) 渲染视图

```vue
<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
          <!-- 导入 -->
        <el-button type="primary" @click="onImportExcelClick"> {{ $t('msg.excel.importExcel') }}</el-button>
        <!-- 导出 -->
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <!-- 姓名 -->
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <!-- 联系方式 -->
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                power[item.id - 1]
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 开通时间 -->
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
            <template #default="{row}">
                {{$filters.dateFilter(row.openTime)}}
            </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{row}">
              <!-- 查看 -->
            <el-button type="primary" size="mini" @click="onShowClick(row._id)">{{
              $t('msg.excel.show')
            }}</el-button>
            <!-- 角色 -->
            <el-button type="info" size="mini">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <!-- 删除 -->
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
  </div>
</template>

<script setup>
import { deleteUser, getUserManageList } from '@/api/user-manager'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ExportToExcel from './components/export2Excel.vue'
// 权限
const power = ['超级管理员', '管理员', '普通员工']
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

/**
 * 获取数据
 */
const getListData = async () => {
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)

// 分页相关

/**
 * size 改变触发
 * @param {*} currentSize 当前每页显示条数
 */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 * @param {*} currentPage 当前页
 */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
```

## 全局属性处理时间展示问题

在 `Vue3`中取消了 [过滤器的概念](https://v3.cn.vuejs.org/guide/migration/filters.html)，其中：

1. 局部过滤器被完全删除
2. 全局过滤器虽然被移除，但是可以使用 [全局属性](https://v3.cn.vuejs.org/api/application-config.html#globalproperties) 进行替代

那么在列表中的时间处理部分，在 `vue2` 时代通常我们都是通过 **全局过滤器** 来进行实现的，所以在 `vue3` 中我们就顺理成章的通过  [全局属性](https://v3.cn.vuejs.org/api/application-config.html#globalproperties) 替代实现

1. 时间处理部分我们通过 [Day.js](https://day.js.org/) 进行处理

2. 下载 [Day.js](https://day.js.org/) 

```
npm i dayjs@1.10.6
```

3. 创建 `src/filter` 文件夹，用于定义 [全局属性](https://v3.cn.vuejs.org/api/application-config.html#globalproperties) 

```js
import dayjs from 'dayjs'

/**
 * dayjs转换时间戳
 * @param {*} val 时间戳
 * @param {*} format 格式
 * @returns
 */
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 如果可以被转成数字 就转成数字
  if (!isNaN(val)) val = parseInt(val)
  return dayjs(val).format(format)
}

/**
 * 统一导出
 */
export default app => {
  // app.config.globalProperties 挂载全局属性和方法
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
```

4. 在 `main.js` 中导入

```js
// filter
import installFilter from '@/filters'

installFilter(app)
```

5. 在 `user-manage` 中使用全局属性处理时间解析

```html
<el-table-column :label="$t('msg.excel.openTime')">
    <template #default="{ row }">
    {{ $filters.dateFilter(row.openTime) }}
    </template>
</el-table-column>
```

## excel 导入

### 原理与实现分析

业务流程：

1. 点击  **excel 导入** 按钮进入  **excel 导入页面**
2. 页面提供了两种导入形式
   1. 点击按钮上传 `excel` 
   2. 把 `excel` 拖入指定区域
3. 选中文件，进行两步操作
   1. 解析 `excel` 数据
   2. 上传解析之后的数据
4. 上传成功之后，返回 **员工管理（用户列表）** 页面，进行数据展示

整个 `excel` 导入核心的原理部分在于 **选中文件之后，上传成功之前** 的操作，即：

1. 解析 `excel` 数据（**最重要**）
2. 上传解析之后的数据

实现流程：

1. 创建 `excel` 导入页面
2. 点击 `excel` 导入按钮，进入该页面
3. 该页面提供两种文件导入形式
4. 选中文件之后，解析 `excel` 数据（核心）
5. 上传解析之后的数据
6. 返回 员工管理（用户列表） 页面

### 提供两种文件导入形式

```html
<el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}</el-button
        >
```
```js
const router = useRouter()
/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}
```

**提供两种文件导入形式**

1. 创建 `components/UploadExcel` 组件，用于处理上传 `excel` 相关的问题

2. 2. 在 `import` 中导入该组件

```vue
<template>
    <upload-excel></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
</script>
```

3. 整个 `UploadExcel` 组件的内容可以分成两部分：

   1. 样式
   2. 逻辑

4. 先处理样式内容

```vue
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
import {} from 'vue'
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

```

### 文件选择之后的数据解析处理

**选中文件之后，解析 `excel` 数据** 

解析的方式根据导入形式的不同也可以分为两种：

1. 文件选择（选择隐藏域）导入
2. 文件拖拽导入

**文件选择（选择隐藏域）导入**

1. 解析 `excel` 数据需要使用 [xlsx](https://www.npmjs.com/package/xlsx) 

```
npm i xlsx@0.17.0
```

实现对应代码：
```js
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
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()

    // 读取操作完成时触发 读取来的文件会被回调到 onload 中 异步操作
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
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

    // 读取指定的 Blob 或 File 内容 异步
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入内容生成数据
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
```

`getHeaderRow` 为 `xlsx` 解析表头数据的通用方法，直接使用即可
`\src\components\uploadExcel\utils.js`
```js
import XLSX from 'xlsx'
/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = sheet => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}
```

在 `import` 组件中传入 `onSuccess` 事件，获取解析成功之后的 `excel` 数据

```vue
<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'

/**
 * 数据解析成功之后的回调
 */
const onSuccess = excelData => {
  console.log(excelData)
}
</script>
```

**文件拖入之后的数据解析处理**

> [HTML_Drag_and_Drop（HTML 拖放 API）](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

这里主要使用到其中三个事件：

1. [drop (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event)：当元素或选中的文本在可释放目标上被释放时触发
2. [dragover (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event)：当元素或选中的文本被拖到一个可释放目标上时触发
3. [dragenter (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event)：当拖拽元素或选中的文本到一个可释放目标时触发

- 在 `utils` 中生成 `isExcel` 方法
`src\components\uploadExcel\utils.js`
```js
/**
 * 判断是否为 excel 文件
 * @param {*} file 上传的文件
 * @returns
 */
export const isExcel = file => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
```

- 拖拽上传逻辑
```js
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
```

### 传递解析后的 excel 数据

1. 定义 `api/user-manage` 上传接口
```js
/**
 * 批量上传
 * @param {*} data
 * @returns
 */
export const uploadUserBatchImport = data => request({
  url: '/user-manage/batch/import',
  method: 'POST',
  data
})
```

2. 在 `onSuccess` 中调用接口上传数据
注意：
   1. `header` 头不需要上传
   2. `results` 中 `key` 为中文，我们必须要按照接口要求进行上传

3. 需要处理 `results` 中的数据结构

4. 创建 `import/utils` 文件

```js
/**
* 导入数据对应表
*/
export const USER_RELATIONS = {
    姓名: 'username',
    联系方式: 'mobile',
    角色: 'role',
    开通时间: 'openTime'
}
```

5. 创建数据解析方法，生成新数组

```js
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
      // item[key] 作为 userInfo 的 key 值
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
```

6. 完成数据上传
```js
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
```

### 处理剩余 bug

1. 上传之后的时间解析错误
2. 返回用户列表之后，数据不会自动刷新

**上传之后的时间解析错误：**

导致该问题出现的原因是因为 **excel 导入解析时间会出现错误**

1. 在 `import/utils` 中新增事件处理方法（固定方式直接使用即可）
```js
/**
* 解析 excel 导入的时间格式
*/
export const formatDate = (numb) => {
    const time = new Date((numb - 1) * 24 * 3600000 + 1)
    time.setYear(time.getFullYear() - 70)
    const year = time.getFullYear() + ''
    const month = time.getMonth() + 1 + ''
    const date = time.getDate() - 1 + ''
    return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
    )
}
```

2. 在 `generateData` 中针对 `openTime` 进行单独处理

```diff
/**
 * 筛选数据
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
+      // 单独处理 openTime 格式
+      if (USER_RELATIONS[key] === 'openTime') {
+        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
+        return
+      }
      // 把 USER_RELATIONS[key] 的 值当作 userInfo 的 key
      // item[key] 作为 userInfo 的 key 值
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
```

**返回用户列表之后，数据不会自动刷新：**

出现该问题的原因是因为：**`appmain` 中使用 `keepAlive` 进行了组件缓存**。

解决的方案也很简单，只需要：**监听 [onActivated](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#activated) 事件，重新获取数据即可** 

在 `user-manage` 中：

```js
import { ref, onActivated } from 'vue'

// 处理导入用户后数据不重新加载的问题
onActivated(getListData)
```

## 用户删除

删除用户的功能比较简单，只需要 **调用对应的接口**

1. 在 `api/user-manage` 中指定删除接口

```js
/**
 * 删除指定数据
 */
export const deleteUser = (id) => request({
  url: `/user-manage/detele/${id}`,
  method: 'DELETE'
})
```

2. 在 `views/user-manage` 中调用删除接口接口

```html
<el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
    $t('msg.excel.remove')
}}</el-button>
```
```js
/**
 * 删除用户
 * @param {*} row 列表每行数据
 */
const i18n = useI18n()
const onRemoveClick = async (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}
```

## excel 导出

### 原理与实现分析

业务逻辑：

1. 点击 `excel` 导出按钮
2. 展示 `dialog` 弹出层
3. 确定导出的 `excel` 文件名称
4. 点击导出按钮
5. 获取 **所有用户列表数据**
6. 将 `json` 结构数据转化为 `excel` 数据，并下载

核心原理：**将 `json` 结构数据转化为 `excel` 数据，并下载**

实现方案：

1. 创建 `excel` 导出弹出层
2. 处理弹出层相关的业务
3. 点击导出按钮，将 `json` 结构数据转化为 `excel` 数据，并下载（核心）


### Export2Excel 组件

创建 `excel` 弹出层组件 `Export2Excel `

1. 创建 `views/user-manage/components/Export2Excel `

```vue
<template>
    <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
    >
    <el-input
        :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
            $t('msg.excel.confirm')
        }}</el-button>
        </span>
    </template>
    </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    modelValue: {
    type: Boolean,
    required: true
    }
})
const emits = defineEmits(['update:modelValue'])

/**
* 导出按钮点击事件
*/
const onConfirm = async () => {
    closed()
}

/**
* 关闭
*/
const closed = () => {
    emits('update:modelValue', false)
}
</script>
```

2. 在 `user-manage` 中进行导入 `dialog` 组件

   1. 指定 `excel`按钮 点击事件

      ```html
      <el-button type="success" @click="onToExcelClick">
      	{{ $t('msg.excel.exportExcel') }}
      </el-button>
      ```

   2. 导入 `ExportToExcel` 组件

    ```html
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    ```
    ```js
    import ExportToExcel from './components/export2Excel.vue'
    ```

   3. 点击事件处理函数

      ```js
      /**
       * excel 导出点击事件
       */
      const exportToExcelVisible = ref(false)
      const onToExcelClick = () => {
        exportToExcelVisible.value = true
      }
      ```

### 导出前置业务处理

1. 指定 `input` 默认导出文件名称
2. 定义 **获取全部用户** 列表接口，并调用

**指定 `input` 默认导出文件名称**

1. 指定 `input` 的双向绑定

```html
<el-input
    v-model="excelName"
    :placeholder="$t('msg.excel.placeholder')"
></el-input>
```

2. 指定默认文件名
```js
// 指定默认文件名
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})
```

**定义获取全部用户列表接口，并调用：**

1. 在 `user-manage` 中定义获取全部数据接口

```js
/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => request({
  url: '/user-manage/all-list'
})
```

2. 调用接口数据，并指定 `loading`

```html
<el-button type="primary" @click="onConfirm" :loading="loading">{{
$t('msg.excel.confirm')
}}</el-button>
```

```js
import { getUserManageAllList } from '@/api/user-manage'

/**
* 导出按钮点击事件
*/
const loading = ref(false)
const onConfirm = async () => {
    loading.value = true
    const allUser = (await getUserManageAllList()).list

    closed()
}

/**
* 关闭
*/
const closed = () => {
    loading.value = false
    emits('update:modelValue', false)
}
```

### 实现 excel 导出逻辑

步骤：

1. 将 `json` 结构数据转化为 `excel` 数据
2. 下载对应的 `excel` 数据

**将 `json` 结构数据转化为 `excel` 数据**

```js
/* eslint-disable */
// 文件下载工具
import { saveAs } from 'file-saver'
// excel 解析器和编译器
import XLSX from 'xlsx'

function datenum(v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {}
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = {
        v: data[R][C]
      }
      if (cell.v == null) continue
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      })

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

/**
 * 将 json 结构数据转化为 excel 数据
 * @param multiHeader 多表头数据
 * @param header 表头
 * @param data 数据
 * @param filename 文件名称
 * @param merges 合并单元格
 * @param autoWidth 自动列宽
 * @param bookType 导出文件类型
 */
export const export_json_to_excel = ({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) => {
  // 1. 设置文件名称
  filename = filename || 'excel-list'
  // 2. 把数据解析为数组，并把表头添加到数组的头部
  data = [...data]
  data.unshift(header)
  // 3. 解析多表头，把多表头的数据添加到数组头部（二维数组）
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }
  // 4. 设置 Excel 表工作簿（第一张表格）名称
  var ws_name = 'SheetJS'
  // 5. 生成工作簿对象
  var wb = new Workbook()
  // 6. 将 data 数组（json格式）转化为 Excel 数据格式
  var ws = sheet_from_array_of_arrays(data)
  // 7. 合并单元格相关（['A1:A2', 'B1:D1', 'E1:E2']）
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach((item) => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  // 8. 单元格宽度相关
  if (autoWidth) {
    /*设置 worksheet 每列的最大宽度*/
    const colWidth = data.map((row) =>
      row.map((val) => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10
          }
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2
          }
        } else {
          return {
            wch: val.toString().length
          }
        }
      })
    )
    /*以第一行为初始值*/
    let result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    ws['!cols'] = result
  }

  // 9. 添加工作表（解析后的 excel 数据）到工作簿
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws
  // 10. 写入数据
  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  // 11. 下载数据
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    `${filename}.${bookType}`
  )
}
```

导入两个依赖库：

1.  [xlsx](https://www.npmjs.com/package/xlsx) （已下载）：`excel` 解析器和编译器
2. [file-saver](https://www.npmjs.com/package/file-saver)：文件下载工具，通过 `npm i file-saver@2.0.5` 下载

实现 `excel` 导出功能：

1. 动态导入 `Export2Excel.js` 

```js
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
```

2. 因为从服务端获取到的为 `json 数组对象` 结构，但是导出时的数据需要为 **二维数组**，所以需要有一个方法来把 **`json` 结构转化为 二维数组**

3. 创建转化方法
   1. 创建 `views/user-manage/components/Export2ExcelConstants.js` 中英文对照表

      ```js
      /**
       * 导入数据对应表
       */
      export const USER_RELATIONS = {
        姓名: 'username',
        联系方式: 'mobile',
        角色: 'role',
        开通时间: 'openTime'
      }
      ```

    2. 创建数据解析方法

    - 角色为数组格式 需要特殊处理为字符串
    - excel 时间需要特殊处理

    ```js
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
    ```

4. 调用该方法，获取导出的二维数组数据

```js
import { USER_RELATIONS } from './Export2ExcelConstants'

const data = formatJson(USER_RELATIONS, allUser)
```

5. 调用 `export_json_to_excel` 方法，完成 `excel` 导出

```js
    excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
    })
```

6. 总代码
```js
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
```

## 局部打印

### 详情原理与实现分析

逻辑分为两部分：

1. 以表格的形式展示员工详情
2. 打印详情表格

**以表格的形式展示员工详情** 部分需要使用到 [el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html) 组件

在浏览器右键时，其实可以直接看到对应的 **打印** 选项，但是这个打印选项是直接打印整个页面，不能指定打印页面中的某一部分的。

所以说 **打印是浏览器本身的功能**，但是这个功能存在一定的缺陷，那就是 **只能打印整个页面**

而想要实现 **详情打印**，那么就需要在这个功能的基础之上做到指定打印具体的某一块视图，而这个功能已经有一个第三方的包 [vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version) 进行实现

步骤：

1. 获取员工详情数据
2. 在员工详情页面，渲染详情数据
3. 利用  [vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version) 进行局部打印

### 获取展示数据

获取对应的展示数据

1. 在 `api/user-manage` 中定义获取用户详情接口
```js
/**
 * 获取用户详情
 */
export const userDetail = (id) => request({
  url: `/user-manage/detail/${id}`
})
```

2. 在 `views/user-info` 中根据 `id` 获取接口详情数据，并进行国际化处理

```vue
<script setup>
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { defineProps, ref } from 'vue'

const props = defineProps({
    id: {
    type: String,
    required: true
    }
})

// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
    detailData.value = await userDetail(props.id)
}
getUserDetail()
// 语言切换
watchSwitchLang(getUserDetail)
</script>
```

3. 因为用户详情可以会以组件的形式进行呈现，所以对于此处需要得到的 `id` ，可以通过 [vue-router Props 传参](https://next.router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F) 的形式进行

4. 指定路由表

```js
{
    path: '/user/info/:id',
    name: 'userInfo',
    component: () => import('@/views/user-info/index'),
    props: true,
    meta: {
        title: 'userInfo'
    }
}
```

5. 在 `views/user-manage` 中传递用户 `id`

```html
<el-button
    type="primary"
    size="mini"
    @click="onShowClick(row._id)"
>
{{ $t('msg.excel.show') }}
</el-button>
```
```js
/**
 * 查看按钮点击事件
 */
const onShowClick = id => {
    router.push(`/user/info/${id}`)
}
```

### 渲染详情结构

> [el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html)

[el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html) 组件作用为：渲染描述列表。
但是本项目期望包含头像的用户详情样式，直接利用一个 [el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html) 组件并无法进行渲染，所以此时需要对多个 [el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html) 组件 与 `img` 标签进行配合使用

渲染代码：
```vue
<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary">{{ $t('msg.userInfo.print') }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
              detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              detailData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              detailData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              detailData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFilter(detailData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('msg.userInfo.address')"
              :span="2"
              >{{ detailData.address }}</el-descriptions-item
            >
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>

```

### 局部打印功能实现

> 借助 [vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version)

```
npm i vue3-print-nb@0.1.4
```

完成下载功能：

1. 指定 `printLoading`

```html
<el-button type="primary" :loading="printLoading">{{
    $t('msg.userInfo.print')
}}</el-button>
```
```js
// 打印相关
const printLoading = ref(false)
```

2. 创建打印对象

```js
// 创建打印对象
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'hidari-vue-element-admin',
  // 打印前回调
  beforeOpenCallback (vue) {
    printLoading.value = true
  },
  // 执行打印回调
  openCallback (vue) {
    printLoading.value = false
  }
}
```

3. 指定打印区域 `id` 匹配

```html
<div id="userInfoBox" class="user-info-box">
```

4. [vue-print-nb](https://github.com/Power-kxLee/vue-print-nb#vue3-version) 以指令的形式存在，所以需要创建对应指令

5. `src\directives\index.js`
```js
// 打印 => 第三方包
import print from 'vue3-print-nb'

export default app => {
  app.use(print)
}
```

6. 将打印指令挂载到 `el-button` 中

```html
<el-button type="primary" v-print="printObj" :loading="printLoading">{{
    $t('msg.userInfo.print')
}}</el-button>
```
