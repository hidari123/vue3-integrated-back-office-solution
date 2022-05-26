<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 16:50:36
 * @FilePath: \vue3-integrated-back-office-solution\src\layout\components\AppMain.vue
 * @Description: 主页面main容器
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
<div class="app-main">
  <!-- 带有切换动画 并且具备组件缓存的 router-view -->
  <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
          <keep-alive>
              <component :is="Component" :key="route.path"/>
          </keep-alive>
      </transition>
  </router-view>
</div>
</template>

<script setup>
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { isTags } from '@/utils/tags'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

/**
 * 生成 title
 */
const getTitle = route => {
  let title = ''

  if (!route.meta) {
    // 如果没有meta.title 把路径最后一部分当作title
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

/**
 * 监听路由变化
 */
const route = useRoute()
const store = useStore()
watch(route, (to, from) => {
  // 不是所有路由都需要保存
  if (!isTags(to.path)) return
  const { fullPath, meta, name, params, path, query } = to
  store.commit('app/addTagsViewList', { fullPath, meta, name, params, path, query, title: getTitle(to) })
}, {
  immediate: true
})

/**
 * 监听语言变化
 */
watchSwitchLang(() => {
  /**
     * 更改 tags 语言
     */
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
