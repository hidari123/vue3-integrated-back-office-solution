<!--
 * @Author: hidari
 * @Date: 2022-05-26 13:16:51
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 19:09:33
 * @FilePath: \vue3-integrated-back-office-solution\src\components\tagsView\index.vue
 * @Description: tags选项组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
  <div class="tags-view-container">
      <el-scrollbar class="tags-view-wrapper">
        <router-link
            v-for="(tag,index) in $store.getters.tagsViewList"
            :key="tag.fullPath"
            class="tags-view-item"
            :class="isActive(tag) ? 'active': ''"
            :to="{path:tag.fullPath}"
            :style="{
            backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
            borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
            }"
            @contextmenu.prevent="openMenu($event,index)"
        >
        {{tag.title}}
        <!-- @click.prevent函数会阻止触发dom的原始事件，而去执行特定的事件 -->
        <el-icon class="el-icon-close" v-show="!isActive(tag)" @click.prevent.stop="onCloseClick(index)"><Close /></el-icon>
        </router-link>
      </el-scrollbar>
      <context-menu v-show="visible" :style="menuStyle" :index="selectIndex" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './components/contextMenu.vue'

const route = useRoute()
/**
 * 是否被选中
 * @returns {Boolean} 如果 tag 的 path 和路径相同 则选中
 */
const isActive = tag => tag.path === route.path

/**
 * 关闭 tag 的点击事件
 */
const store = useStore()
const onCloseClick = (index) => {
  console.log(index)
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

/**
 * 鼠标右键点击事件
 */
const visible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})
// 被点击的tag 的 index
const selectIndex = ref(0)
// 展示 menu
const openMenu = (e, index) => {
  // 鼠标点击时相对于屏幕的 x y 坐标
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 当 visible 改变时监听点击事件
 */
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

/**
 * 关闭菜单事件
 */
const closeMenu = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        // text-align: center;
        /* vertical-align:middle是将元素盒子的垂直中点和父盒子的baseline加上父盒子的x-height的一半对齐。 */
        vertical-align: middle;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
