<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 16:09:08
 * @FilePath: \vue3-integrated-back-office-solution\src\views\user-info\index.vue
 * @Description: 用户详情组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
    <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printObj">{{ $t('msg.userInfo.print') }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
``
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

<script setup>
import { defineProps, ref } from 'vue'
import { getUserDetail } from '@/api/user-manager'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// 数据相关
const detailData = ref({})
const getUserInfo = async () => {
  detailData.value = await getUserDetail(props.id)
}
getUserInfo()

// 语言切换
watchSwitchLang(getUserInfo)

// 打印
const printLoading = ref(false)
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
</script>

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
    :deep(.el-descriptions) {
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
