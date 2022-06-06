<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-06 18:03:14
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-ranking\index.vue
 * @Description: 文章排名模块
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicData">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
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
import { ref, onActivated, onMounted } from 'vue'
import { deleteArticle, getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
// 导入动态列数据
import { dynamicData, selectDynamicData, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

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

/**
 * 初始化 sortable
 */
onMounted(() => {
  console.log(tableRef.value)
  // tableData 在获取到数据之后才开始赋值 刚开始是空的 所以此时传递参数不能传递 tableData.value
  // 应该传递响应式数据
  initSortable(tableData, getListData)
})

/**
 * size 改变触发
 * @param {*} currentSize 当前 size
 */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 * @param {*} currentPage 当前 page
 */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}

/**
 * 查看按钮点击事件
 */
const router = useRouter()
const onShowClick = row => {
  router.push(`/article/${row._id}`)
}

// 点击删除用户
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

  :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }

  :deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
}
</style>
