<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 12:26:53
 * @FilePath: \vue3-integrated-back-office-solution\src\App.vue
 * @Description: 入口文件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'
// 统一引入 echarts
import * as echarts from 'echarts'
import { provide } from 'vue'
/**
 * 提供给后代 echarts
 */
provide('ec', echarts) // provide

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
const store = useStore()
/**
 * 从store中取出设定的主题色，在主页面进入时发送请求更改
 */
generateNewStyle(store.getters.mainColor).then(newStyle => {
  writeNewStyle(newStyle)
})
</script>

<style lang="scss">
</style>
