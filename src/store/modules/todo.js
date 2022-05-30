/*
 * @Author: hidari
 * @Date: 2022-05-30 12:20:16
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-30 14:33:28
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\todo.js
 * @Description: todo 仓库
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import { TODO_KEYS } from '@/constant'
import { defalutList } from '@/constant/defaultList'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    todos: getItem(TODO_KEYS) || defalutList
  }),
  mutations: {
    /**
       * 保存到本地
       * @param {*} state
       */
    setLocalStorage (state) {
      setItem(TODO_KEYS, state.todos)
    },
    /**
     * 添加todo
     * @param {*} state
     * @param {*} event 监听键盘抬起事件传递的事件 event
     */
    addTodo (state, event) {
      // 获取输入文本内容
      const text = event.target.value
      // 如果有值 添加到数组中
      if (state.todos.find(todo => todo.text === text)) return
      if (text.trim()) {
        state.todos.push({ text, done: false })
        // 本地存储
        this.commit('todo/setLocalStorage')
      }
      // 清空输入框内容
      event.target.value = ''
    },

    /**
     * 切换完成状态
     * @param {*} state
     * @param {*} item 切换的某一项
     */
    toggleTodo (state, item) {
      state.todos.forEach(todo => {
        if (todo.text === item.text) {
          todo.done = !todo.done
        }
      })
      // 本地存储
      this.commit('todo/setLocalStorage')
    },

    /**
     * 删除 todo
     * @param {*} state
     * @param {*} item 删除的某一项
     */
    deleteTodo (state, item) {
      console.log(item)
      state.todos.splice(state.todos.indexOf(item), 1)
      // 本地存储
      this.commit('todo/setLocalStorage')
    },

    /**
     * 修改某一项 text
     * @param {*} state
     * @param {*} value 修改后的值
     */
    editTodo (state, { todo, value }) {
      state.todos.forEach(item => {
        if (item.text === todo.text) {
          item.text = value
        }
      })
      this.commit('todo/setLocalStorage')
    },

    /**
     * 清空已完成
     * @param {*} state
     */
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => !todo.done)
      this.commit('todo/setLocalStorage')
    },

    /**
     * 切换全部
     * @param {*} state
     */
    toggleAll (state, { done }) {
      state.todos.forEach(todo => {
        todo.done = done
        this.commit('todo/setLocalStorage')
      })
    }
  }
}
