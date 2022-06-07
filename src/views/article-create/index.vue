<!--
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-07 11:53:22
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-create\index.vue
 * @Description: 创建文章
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown
           :detail="detail"
           :title="title"
           @on-success="onSuccess"
           ></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor
              :title="title"
              :detail="detail"
              @onSuccess="onSuccess"
            ></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Editor from './components/editor.vue'
import Markdown from './components/markdown.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

const activeName = ref('markdown')
const title = ref('')

// 创建成功
const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
// 获取文章详情
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
// 如果是编辑文章模式 显示对应文章详情
if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
