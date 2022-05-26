/*
 * @Author: hidari
 * @Date: 2022-05-24 09:52:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-26 16:31:55
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\app.js
 * @Description: 左侧菜单伸缩功能 store
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // sidebar是否打开
    sidebarOpened: true,
    // 需要展示的语言
    language: getItem(LANG) || 'zh',
    // tags数据
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    /**
     * 控制打开/关闭sidebar
     * @param {*} state
     */
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    /**
     * 改变需要展示的语言
     * @param {*} state
     * @param {*} lang 需要展示的语言
     */
    setLanguage (state, lang) {
      // 数据持久化
      setItem(LANG, lang)
      state.language = lang
    },

    /**
     * 添加 tags
     * @param {*} state
     * @param {Object} tag 需要添加的tag标签对象
     */
    addTagsViewList (state, tag) {
      // 查找是否已经存在相同 tag
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        // 如果不存在 push
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    /**
     * 为指定的 tag 修改 title
     * @param {*} state
     * @param {*} index => 需要替换的 tag 下标
     * @param {*} tag => 新 tag 名
     */
    changeTagsView (state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },

    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView (state, payload) {
      if (payload.type === 'index') {
        // 删除当前
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        // 删除其他
        // 删除右侧
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        // 删除左侧
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        // 删除右侧
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
