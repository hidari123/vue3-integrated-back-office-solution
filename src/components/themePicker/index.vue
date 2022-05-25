<!--
 * @Author: hidari
 * @Date: 2022-05-25 08:58:15
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-25 10:25:45
 * @FilePath: \vue3-integrated-back-office-solution\src\components\themePicker\index.vue
 * @Description: 换肤组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
   >
   <!-- 图标 -->
   <el-tooltip :content="$t('msg.navBar.themeChange')">
        <div>
            <svg-icon id="guide-theme" icon="change-theme" />
        </div>
   </el-tooltip>
   <template #dropdown>
       <el-dropdown-menu>
           <el-dropdown-item command="color">
                {{ $t('msg.theme.themeColorChange') }}
           </el-dropdown-item>
       </el-dropdown-menu>
   </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
      <select-color v-model="selectColorVisible"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/selectColor.vue'
const handleSetTheme = command => {
  selectColorVisible.value = true
}

// dialog
const selectColorVisible = ref(false)
</script>

<style lang="scss" scoped>

</style>
