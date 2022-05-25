<!--
 * @Author: hidari
 * @Date: 2022-05-25 17:02:20
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 17:51:00
 * @FilePath: \vue3-integrated-back-office-solution\src\components\screenfull\index.vue
 * @Description: 全屏按钮组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div @click="onToggle">
    <el-tooltip :content="$t('msg.navBar.screenfull')">
        <div>
            <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
        </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
// 引入第三方包全屏
import screenfull from 'screenfull/dist/screenfull'

// 是否全屏
const isFullscreen = ref(false)
// 触发事件
const onToggle = () => {
  // 切换全屏
  screenfull.toggle()
}

// 监听 screenfull 变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// on: 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// off：取消绑定
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
