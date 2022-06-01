<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 15:40:47
 * @FilePath: \vue3-integrated-back-office-solution\src\views\user-manage\index.vue
 * @Description: 用户管理模块
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
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
  console.log(res.list)
  total.value = res.total
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)

// 处理导入用户后数据不重新加载的问题
// 监听 keep-alive 组件变化
onActivated(getListData)

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

const router = useRouter()
/**
 * excel 导入按钮点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * 查看用户详情
 * @param {*} id 用户id
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

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

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
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
