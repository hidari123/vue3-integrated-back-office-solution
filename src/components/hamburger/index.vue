<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:57:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-24 11:17:17
 * @FilePath: \vue3-integrated-back-office-solution\src\components\hamburger\index.vue
 * @Description: 左侧菜单伸缩按钮
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->

<template>
  <div class="hamburger-container" @click="toggleClick">
      <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
/**
 * 点击时触发改变状态事件
 */
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
/**
 * 根据左侧菜单是否伸缩动态展示 icon
 */
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
    padding: 0 16px;
    .hamburger {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
    }
}
</style>
