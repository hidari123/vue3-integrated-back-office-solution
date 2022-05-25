<!--
 * @Author: hidari
 * @Date: 2022-05-25 17:42:41
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 17:44:19
 * @FilePath: \vue3-integrated-back-office-solution\src\components\headSearch\index.vue
 * @Description: 页面搜索组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="header-search" :class="{show:isShow}">
      <svg-icon class-name="search-icon" icon="search" @click.stop="onShowClick"></svg-icon>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 控制 search 展示
const isShow = ref(false)
</script>

<style lang="scss" scoped>

</style>
