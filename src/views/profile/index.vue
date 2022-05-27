<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 12:17:32
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\index.vue
 * @Description: 个人中心
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
    <div class="my-container">
    <el-row>
        <el-col :span="6">
        <project-card class="user-card" :features="featureData"></project-card>
        </el-col>
        <el-col :span="18">
        <el-card>
            <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
                <Feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
                <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
                <author />
            </el-tab-pane>
            </el-tabs>
        </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script setup>
import ProjectCard from './components/projectCard.vue'
import Chapter from './components/chapter.vue'
import Feature from './components/feature.vue'
import Author from './components/author.vue'
import { feature } from '@/api/user'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()
// 监听语言切换
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
    .user-card {
    margin-right: 20px;
    }
}
</style>
