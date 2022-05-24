<!--
 * @Author: hidari
 * @Date: 2022-05-24 11:17:17
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 12:15:37
 * @FilePath: \vue3-integrated-back-office-solution\src\components\breadcrumb\index.vue
 * @Description: 面包屑导航
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <el-breadcrumb separator="/" class="breadcrumb">
  <transition-group name="breadcrumb">
    <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="item.path">
        <!-- 不可点击 -->
        <!-- 如果是最后一个 则不可点击 -->
        <span
        class="no-redirect"
        v-if="index === breadcrumbData.length - 1"
        >{{item.meta.title}}</span>
        <!-- 可点击 -->
        <span v-else class="redirect" @click="onLickClick(item)">{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 监听路由变化
const route = useRoute()

// 生成数组数据
const breadcrumbData = ref([])
/**
 * 获取与给定路由地址匹配的标准化的路由记录数组
 */
const getBreadcrumbData = () => {
  // 当前路由的标准化路由记录
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}
/**
 * 监听路由变化时触发
 */
watch(route, () => {
  getBreadcrumbData()
}, {
  immediate: true
})

// 跳转点击事件
const router = useRouter()
const onLickClick = (item) => {
  router.push(item.path)
}

// 将来需要主题替换 所以 hover 颜色 设置为主色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover{
        color: v-bind(linkHoverColor)
    }
  }
}
</style>
