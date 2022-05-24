<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 11:48:26
 * @FilePath: \vue3-integrated-back-office-solution\src\layout\components\Navbar.vue
 * @Description: 主页面头部区域
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="navbar">
    <!-- 汉堡 -->
    <hamburger/>
    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!--      头像-->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a target="_blank">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
              <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/breadcrumb/index.vue'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar{
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);

  .hamburger-container {
      line-height: 50px;
      height: 100%;
      float: left;
      cursor: pointer;
      // hover 动画
      transition: background 0.5s;

      &:hover {
          background: rgba(0,0,0,0.1);
      }
  }

  .breadcrumb-container{
      float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
