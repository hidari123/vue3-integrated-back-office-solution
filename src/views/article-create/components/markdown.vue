<!--
 * @Author: hidari
 * @Date: 2022-06-07 08:56:40
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-07 11:55:11
 * @FilePath: \vue3-integrated-back-office-solution\src\views\article-create\components\markdown.vue
 * @Description: markdown 编辑器
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { commitArticle, editArticle } from './commit'
// 导入markdown第三方包
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

// 初始化 editor
// editor 实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
const store = useStore()

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
const initEditor = () => {
  editor = new Editor({
    // el => markdown 要渲染到哪个区域中
    el,
    // 高度
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  editor.getMarkdown()
}

// 监听语言切换
watchSwitchLang(() => {
  // 如果没有渲染出页面 return
  if (!el) return
  // 获取到用户输入的内容
  const htmlStr = editor.getHTML()
  editor.destroy()
  initEditor()
  editor.setHTML(htmlStr)
})
// 处理提交
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: editor.getHTML()
    })
  }

  // 清空文本
  editor.reset()
  emits('onSuccess')
}

// 编辑相关
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
