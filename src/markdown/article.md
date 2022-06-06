<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [文章](#%E6%96%87%E7%AB%A0)
  - [辅助业务：文章排名页面渲染](#%E8%BE%85%E5%8A%A9%E4%B8%9A%E5%8A%A1%E6%96%87%E7%AB%A0%E6%8E%92%E5%90%8D%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93)
  - [相对时间与时间国际化处理](#%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4%E4%B8%8E%E6%97%B6%E9%97%B4%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%84%E7%90%86)
  - [动态表格原理与实现分析](#%E5%8A%A8%E6%80%81%E8%A1%A8%E6%A0%BC%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E7%8E%B0%E5%88%86%E6%9E%90)
  - [方案落地：动态列数据构建](#%E6%96%B9%E6%A1%88%E8%90%BD%E5%9C%B0%E5%8A%A8%E6%80%81%E5%88%97%E6%95%B0%E6%8D%AE%E6%9E%84%E5%BB%BA)
  - [方案落地：实现动态表格能力](#%E6%96%B9%E6%A1%88%E8%90%BD%E5%9C%B0%E5%AE%9E%E7%8E%B0%E5%8A%A8%E6%80%81%E8%A1%A8%E6%A0%BC%E8%83%BD%E5%8A%9B)
  - [拖拽排序原理与实现分析](#%E6%8B%96%E6%8B%BD%E6%8E%92%E5%BA%8F%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E7%8E%B0%E5%88%86%E6%9E%90)
  - [方案落地：实现表格拖拽功能](#%E6%96%B9%E6%A1%88%E8%90%BD%E5%9C%B0%E5%AE%9E%E7%8E%B0%E8%A1%A8%E6%A0%BC%E6%8B%96%E6%8B%BD%E5%8A%9F%E8%83%BD)
  - [9-10：方案落地：完成拖拽后的排序](#9-10%E6%96%B9%E6%A1%88%E8%90%BD%E5%9C%B0%E5%AE%8C%E6%88%90%E6%8B%96%E6%8B%BD%E5%90%8E%E7%9A%84%E6%8E%92%E5%BA%8F)
  - [辅助业务：文章删除](#%E8%BE%85%E5%8A%A9%E4%B8%9A%E5%8A%A1%E6%96%87%E7%AB%A0%E5%88%A0%E9%99%A4)
  - [辅助业务：文章详情展示](#%E8%BE%85%E5%8A%A9%E4%B8%9A%E5%8A%A1%E6%96%87%E7%AB%A0%E8%AF%A6%E6%83%85%E5%B1%95%E7%A4%BA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-06-06 14:58:12
 * @LastEditors: hidari 
 * @LastEditTime: 2022-06-06 18:10:40
 * @FilePath: \vue3-integrated-back-office-solution\src\markdown\article.md
 * @Description: 文章模块
 * 
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved. 
-->
# 文章

对于 **文章排名** 而言，核心的内容是围绕着表格处理来进行的。对应的核心业务主要有两个：

1. 文章排名切换
2. 动态表格渲染

这两个核心业务配合着其他的一些辅助功能：

1. 文章排名页面展示
2. 文章详情页面展示


## 辅助业务：文章排名页面渲染

整个 **文章排名** 的页面渲染分成三个部分：

1. 顶部的动态展示区域
2. 中间的 `table` 列表展示区域
3. 底部的分页展示区域

1. 创建 `api/article` 文件定义数据获取接口

   ```js
   import request from '@/utils/request'
   
   /**
    * 获取列表数据
    */
   export const getArticleList = data => {
     return request({
       url: '/article/list',
       params: data
     })
   }
   
   ```

2. 在 `article-ranking` 中获取对应数据

   ```js
   <script setup>
   import { ref, onActivated } from 'vue'
   import { getArticleList } from '@/api/article'
   import { watchSwitchLang } from '@/utils/i18n'
   
   // 数据相关
   const tableData = ref([])
   const total = ref(0)
   const page = ref(1)
   const size = ref(10)
   
   // 获取数据的方法
   const getListData = async () => {
     const result = await getArticleList({
       page: page.value,
       size: size.value
     })
     tableData.value = result.list
     total.value = result.total
   }
   getListData()
   // 监听语言切换
   watchSwitchLang(getListData)
   // 处理数据不重新加载的问题
   onActivated(getListData)
   </script>
   ```

3. 根据数据渲染视图

```vue
<template>
    <div class="article-ranking-container">
    <el-card>
        <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
            :label="$t('msg.article.ranking')"
            prop="ranking"
        ></el-table-column>
        <el-table-column
            :label="$t('msg.article.title')"
            prop="title"
        ></el-table-column>
        <el-table-column
            :label="$t('msg.article.author')"
            prop="author"
        ></el-table-column>
        <el-table-column
            :label="$t('msg.article.publicDate')"
            prop="publicDate"
        >
        </el-table-column>
        <el-table-column
            :label="$t('msg.article.desc')"
            prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
            $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
            $t('msg.article.remove')
            }}</el-button>
        </el-table-column>
        </el-table>

        <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        >
        </el-pagination>
    </el-card>
    </div>
</template>

<script setup>
...
/**
* size 改变触发
*/
const handleSizeChange = currentSize => {
    size.value = currentSize
    getListData()
}

/**
* 页码改变触发
*/
const handleCurrentChange = currentPage => {
    page.value = currentPage
    getListData()
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
    .header {
    margin-bottom: 20px;
    .dynamic-box {
        display: flex;
        align-items: center;
        .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
        }
    }
    }

    ::v-deep .el-table__row {
    cursor: pointer;
    }

    .pagination {
    margin-top: 20px;
    text-align: center;
    }
}
</style>

```

## 相对时间与时间国际化处理

在 **发布时间** 列中，我们希望展示相对时间，并且希望相对时间具备国际化的能力。那么我们就去需要到 `filters` 中对 `dayjs` 进行处理

1. 定义相对时间的处理方法

```js
import dayjs from 'dayjs'
// 相对时间
import rt from 'dayjs/plugin/relativeTime'
// 语言包
import 'dayjs/locale/zh-cn'
import store from '@/store'

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

// 加载相对时间插件
dayjs.extend(rt)
const relativeTime = (val) => {
  // 如果可以被转成数字 就转成数字
  if (!isNaN(val)) val = parseInt(val)
  // dayjs().to => 相对时间
  return dayjs()
    // 处理国际化
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

/**
 * 统一导出
 */
export default app => {
  // app.config.globalProperties 挂载全局属性和方法
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
```

2. 在 `article-ranking` 中使用相对时间

   ```html
   <el-table-column :label="$t('msg.article.publicDate')">
        <template #default="{row}">
        {{ $filters.relativeTime(row.publicDate) }}
        </template>
    </el-table-column>
   ```

3. 接下来来处理国际化内容

```js
...
// 语言包
import 'dayjs/locale/zh-cn'
import store from '@/store'

...
// 加载相对时间插件
dayjs.extend(rt)
const relativeTime = (val) => {
  // 如果可以被转成数字 就转成数字
  if (!isNaN(val)) val = parseInt(val)
  // dayjs().to => 相对时间
  return dayjs()
    // 处理国际化
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}
```


## 动态表格原理与实现分析

所谓动态表格指的是：**根据列的勾选，动态展示表格中的列**

那么我们同样把这一句话拆开来去看：

1. 展示可勾选的列
2. 动态展示表格的列

那么我们先来看第一部分 **展示可勾选的列：**

可勾选的列通过 `el-checkbox` 来进行渲染。

所以只要有对应的数据，那么渲染自然也没有对应的难度。

 **动态展示表格的列：**

**动态展示表格的列** 指的就是 **动态的渲染 `el-table-column`** ，那么怎么进行动态渲染`el-table-column`呢？

我们来看现在的 `el-table-column` 的渲染，在页面中我们写入了大量的 `el-table-column` 组件，那么对于这样的组件，我们想一下可不可以通过 `v-for` 进行渲染？

依赖于数据，通过 `v-for` 渲染  `el-table-column` ，当数据改变时 `el-table-column` 的渲染自然也就发生了变化，这样我们是不是就完成了 **动态的渲染 `el-table-column`** 功能了？

所以以上两个功能，最核心的部分就是 **列数据的指定**，只要有了对应的数据，那么对应的渲染也就非常简单了。

所以我们总结一下对应的实现步骤：

1. 构建列数据（核心）
2. 根据数据，通过 `el-checkbox` 渲染可勾选的列
3. 根据数据，通过 `v-for` 动态渲染  `el-table-column` 



## 方案落地：动态列数据构建

因为我们要在 `article-ranking` 中处理多个业务，如果我们把所有的业务处理都写到 `article-ranking` 中，那么对应的组件就过于复杂了，所以说我们把所有的 **动态列表** 相关的业务放入到 `article-ranking/dynamic` 文件夹中

1. 创建 `article-ranking/dynamic/DynamicData` 文件，用来指定初始的 **列数据**

   ```js
   import i18n from '@/i18n'
   
   const t = i18n.global.t
   
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
   ```

2. 创建 `article-ranking/dynamic/index` 文件，对外暴露出

   1. 动态列数据
   2. 被勾选的动态列数据
   3. table 的列数据

   ```js
   import getDynamicData from './DynamicData'
   import { watchSwitchLang } from '@/utils/i18n'
   import { watch, ref } from 'vue'
   
   // 暴露出动态列数据
   export const dynamicData = ref(getDynamicData())
   
   // 监听 语言变化
   watchSwitchLang(() => {
     // 重新获取国际化的值
     dynamicData.value = getDynamicData()
     // 重新处理被勾选的列数据
     initSelectDynamicLabel()
   })
   
   // 创建被勾选的动态列数据
   export const selectDynamicLabel = ref([])
   // 默认全部勾选
   const initSelectDynamicLabel = () => {
     selectDynamicLabel.value = dynamicData.value.map(item => item.label)
   }
   initSelectDynamicLabel()
   
   // 声明 table 的列数据
   export const tableColumns = ref([])
   // 监听选中项的变化，根据选中项动态改变 table 列数据的值
   watch(
     selectDynamicLabel,
     val => {
       tableColumns.value = []
       // 遍历选中项
       const selectData = dynamicData.value.filter(item => {
         return val.includes(item.label)
       })
       tableColumns.value.push(...selectData)
     },
     {
       immediate: true
     }
   )
   ```

## 方案落地：实现动态表格能力

那么现在有了数据之后，我们就可以实现对应的动态表格功能了

1. 在 `article-ranking` 中渲染 **动态表格的 `check`**

2. 导入动态表格的 `check` 数据

   ```js
   import { dynamicData, selectDynamicLabel } from './dynamic'
   ```

3. 完成动态表格的 `check` 渲染

   ```html
       <el-card class="header">
         <div class="dynamic-box">
           <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
           <el-checkbox-group v-model="selectDynamicLabel">
             <el-checkbox
               v-for="(item, index) in dynamicData"
               :label="item.label"
               :key="index"
               >{{ item.label }}</el-checkbox
             >
           </el-checkbox-group>
         </div>
       </el-card>
   ```

4. 导入动态列数据

   ```js
   import { ... tableColumns } from './dynamic'
   ```

5. 完成动态列渲染

   ```html
         <el-table ref="tableRef" :data="tableData" border>
           <el-table-column
             v-for="(item, index) in tableColumns"
             :key="index"
             :prop="item.prop"
             :label="item.label"
           >
             <template #default="{ row }" v-if="item.prop === 'publicDate'">
               {{ $filters.relativeTime(row.publicDate) }}
             </template>
             <template #default="{ row }" v-else-if="item.prop === 'action'">
               <el-button type="primary" size="mini" @click="onShowClick(row)">{{
                 $t('msg.article.show')
               }}</el-button>
               <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
                 $t('msg.article.remove')
               }}</el-button>
             </template>
           </el-table-column>
         </el-table>
   ```

## 拖拽排序原理与实现分析

实现 **表格拖动排序** 的功能

具体业务：

1. 鼠标在某一行中按下
2. 移动鼠标位置
3. 产生对应的替换样式
4. 鼠标抬起，表格行顺序发生变化

核心：**监听鼠标事件，完成对应的 UI 视图处理**

具体：

1. 监听鼠标的按下事件
2. 监听鼠标的移动事件
3. 生成对应的 `UI` 样式
4. 监听鼠标的抬起事件

> [sortablejs](https://www.npmjs.com/package/sortablejs)：用于在列表中实现拖动排序

整个 **拖动排序** 的核心实现，就是围绕着 [sortablejs](https://www.npmjs.com/package/sortablejs) 来进行的

实现方案：

1. 利用 [sortablejs](https://www.npmjs.com/package/sortablejs) 实现表格拖拽功能
2. 在拖拽完成后，调用接口完成排序

## 方案落地：实现表格拖拽功能

1. 下载 sortablejs

   ```
   npm i sortablejs@1.14.0
   ```

2. 创建 `article-ranking/sortable/index` 文件，完成 `sortable` 初始化

   ```js
   import { ref } from 'vue'
   import Sortable from 'sortablejs'
   
   // 排序相关
   export const tableRef = ref(null)
   
   /**
    * 初始化排序
    */
   export const initSortable = (tableData, cb) => {
     // 设置拖拽效果
     const el = tableRef.value.$el.querySelectorAll(
       '.el-table__body-wrapper > table > tbody'
     )[0]
     // 1. 要拖拽的元素
     // 2. 配置对象
     Sortable.create(el, {
       // 拖拽时类名
       ghostClass: 'sortable-ghost',
       // 拖拽结束的回调方法
       onEnd(event) {}
     })
   }
   ```

3. 在 `article-ranking` 中导入 `tableRef, initSortable`，并完成初始化

   ```js
   import { tableRef, initSortable } from './sortable'
   
   // 表格拖拽相关
   onMounted(() => {
     initSortable(tableData, getListData)
   })
   ```

4. 指定拖拽时的样式

   ```css
   ::v-deep .sortable-ghost {
     opacity: 0.6;
     color: #fff !important;
     background: #304156 !important;
   }
   ```

## 9-10：方案落地：完成拖拽后的排序

完成拖拽后的排序主要是在 **拖拽结束的回调方法** 中进行。

我们需要在 拖拽结束的回调方法中调用对应的服务端接口完成持久化的排序

1. 在 `api/article` 中定义排序接口

   ```js
   /**
    * 修改排序
    */
   export const articleSort = data => {
     return request({
       url: '/article/sort',
       method: 'POST',
       data
     })
   }
   ```

2. 在拖拽结束的回调方法中调用接口

   ```js
       // 拖拽结束的回调方法
       async onEnd(event) {
         const { newIndex, oldIndex } = event
         // 修改数据
         await articleSort({
           initRanking: tableData.value[oldIndex].ranking,
           finalRanking: tableData.value[newIndex].ranking
         })
         ElMessage.success({
           message: i18n.global.t('msg.article.sortSuccess'),
           type: 'success'
         })
         // 直接重新获取数据无法刷新 table！！
         tableData.value = []
         // 重新获取数据
         cb && cb()
       }
   ```


## 辅助业务：文章删除

1. 定义删除接口

   ```js
   /**
    * 删除文章
    */
   export const deleteArticle = articleId => {
     return request({
       url: `/article/delete/${articleId}`
     })
   }
   ```

   

2. 为删除按钮添加点击事件

   ```html
   <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
                 $t('msg.article.remove')
               }}</el-button>
   ```

3. 处理删除操作

   ```js
   // 删除用户
   const i18n = useI18n()
   const onRemoveClick = row => {
     ElMessageBox.confirm(
       i18n.t('msg.article.dialogTitle1') +
         row.title +
         i18n.t('msg.article.dialogTitle2'),
       {
         type: 'warning'
       }
     ).then(async () => {
       await deleteArticle(row._id)
       ElMessage.success(i18n.t('msg.article.removeSuccess'))
       // 重新渲染数据
       getListData()
     })
   }
   ```

   



## 辅助业务：文章详情展示

对于文章详情的展示而言，主要是为了配合 **创建文章** 的功能而产生的。

文章详情中包含一个 **编辑** 按钮，用于对文章的编辑功能。与 **创建文章** 配合，达到相辅相成的目的。

但是现在 **创建文章** 尚未实现，所以 **编辑文章** 也就暂时无从谈起，所以说我们此时仅先实现 **文章详情展示** 的功能，后续在完成了 **创建文章** 之后，再去实现 **文章编辑**

1. 在 `api/article` 中定义获取文章详情接口

   ```js
   /**
    * 获取文章详情
    */
   export const articleDetail = (articleId) => {
     return request({
       url: `/article/${articleId}`
     })
   }
   ```

2. 在 `article-detail` 中获取文章详情数据

   ```vue
   <script setup>
   import { ref } from 'vue'
   import { useRoute } from 'vue-router'
   import { articleDetail } from '@/api/article'
   
   // 获取数据
   const route = useRoute()
   const articleId = route.params.id
   const detail = ref({})
   const getArticleDetail = async () => {
     detail.value = await articleDetail(articleId)
   }
   getArticleDetail()
   </script>
   ```

3. 根据数据渲染视图

```vue
<template>
    <div class="article-detail-container">
    <h2 class="title">{{ detail.title }}</h2>
    <div class="header">
        <span class="author"
        >{{ $t('msg.article.author') }}：{{ detail.author }}</span
        >
        <span class="time"
        >{{ $t('msg.article.publicDate') }}：{{
            $filters.relativeTime(detail.publicDate)
        }}</span
        >
        <el-button type="text" class="edit" @click="onEditClick">{{
        $t('msg.article.edit')
        }}</el-button>
    </div>
    <div class="content" v-html="detail.content"></div>
    </div>
</template>

...

<style lang="scss" scoped>
.article-detail-container {
    .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
    }
    .header {
    padding: 26px 0;
    .author {
        font-size: 14px;
        color: #555666;
        margin-right: 20px;
    }
    .time {
        font-size: 14px;
        color: #999aaa;
        margin-right: 20px;
    }
    .edit {
        float: right;
    }
    }
    .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
    }
}
</style>

```

4. 点击进入详情页面

   ```js
   /**
    * 查看按钮点击事件
    */
   const router = useRouter()
   const onShowClick = row => {
     router.push(`/article/${row._id}`)
   }
   ```









