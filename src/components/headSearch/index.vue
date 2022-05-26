<!--
 * @Author: hidari
 * @Date: 2022-05-25 17:42:41
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 12:32:03
 * @FilePath: \vue3-integrated-back-office-solution\src\components\headSearch\index.vue
 * @Description: 页面搜索组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="header-search" :class="{show:isShow}">
      <el-tooltip :content="$t('msg.navBar.headerSearch')">
        <div @click.stop="onShowClick" >
            <svg-icon id="guide-search" class-name="search-icon" icon="search" />
        </div>
      </el-tooltip>
      <el-select
        ref="headerSearchSelectRef"
        class="header-search-select"
        v-model="search"
        filterable
        default-first-option
        remote
        placeholder="Search"
        :remote-method="querySearch"
        @change="onSelectChange"
      >
        <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
        ></el-option>
      </el-select>
  </div>
</template>

<script setup>
import { filterRouters } from '@/utils/route'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { generateRoutes } from './fuseData'
// 导入第三方包模糊搜索
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
/**
 * 处理数据源
 */
let searchPool = computed(() => {
  // 筛选出所有需要的路由
  const routes = filterRouters(router.getRoutes())
  return generateRoutes(routes)
})

/**
 * 搜索库相关
 * @param {Object} searchPool => 搜索库
 * @param {Object}  配置项 keys => 搜索方法权重配置
 */
let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
  // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// 控制 search 展示
const isShow = ref(false)
// 搜索框ref
const headerSearchSelectRef = ref(null)
/**
 * 当点击搜索按钮时显示搜索框
 */
const onShowClick = () => {
  isShow.value = !isShow.value
}

/**
 * 监听isShow变化 点击body 完成关闭搜索框
 */
watch(isShow, val => {
  if (val) {
    // 搜索框获得焦点
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.removeEventListener('click', onClose)
  }
})

/**
 * 关闭搜索框事件
 */
const onClose = () => {
  // 搜索框失去焦点
  headerSearchSelectRef.value.blur()
  isShow.value = !isShow.value
}

// 搜索相关
const search = ref('')

// 储存搜索结果数组
const searchOptions = ref([])
/**
 * 搜索方法
 * @param {String} query => 输入的搜索内容
 */
const querySearch = (query) => {
  searchOptions.value = query === '' ? [] : fuse.search(query)
}

/**
 * 选中回调
 * @param {Object} val => 输入的搜索内容对应的搜索结果中的item项
 */
const onSelectChange = (val) => {
  // 改变 search 显示
  search.value = val.title.join(' > ')
  router.push(val.path)
}

/**
 * 监听语言变化
 */
watchSwitchLang(() => {
  // 监听语言变化的回调函数
  searchPool = computed(() => {
    // 重新筛选出所有需要的路由
    const routes = filterRouters(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
