<!--
 * @Author: hidari
 * @Date: 2022-05-24 13:26:06
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 19:53:30
 * @FilePath: \vue3-integrated-back-office-solution\src\components\langSelect\index.vue
 * @Description: 切换中英文组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <el-dropdown
   id="guide-lang"
   class="international"
    trigger="click"
     @command="handleSetLanguage"
   >
    <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <div>
            <svg-icon icon="language"></svg-icon>
        </div>
    </el-tooltip>
    <template #dropdown>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
    </template>
   </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

defineProps({
  // 接受传递来的props 提示背景色
  effect: {
    type: String,
    default: 'dark',
    // 只能在 dark light 中切换
    validator: (value) => ['dark', 'light'].indexOf(value) !== -1
  }
})

const store = useStore()
// 从仓库中取到language
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 中保存的language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped>

</style>
