<!--
 * @Author: hidari
 * @Date: 2022-05-30 11:52:10
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-30 15:35:49
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\todoList\todo.vue
 * @Description: todoList 每一项
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
<!-- 只有元素内容会被列在文档大纲中时，才适合用section元素 -->
<!-- section的作用是对页面上的内容进行分块，如各个有标题的版块、功能区或对文章进行分段，不要与有自己完整、独立内容的article混淆 -->
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      >
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
    <input
      v-show="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  todo: {
    type: Object,
    default: function () {
      return {}
    }
  }
})

const store = useStore()
const editing = ref(false)
const deleteTodo = (todo) => {
  console.log(todo)
  store.commit('todo/deleteTodo', todo)
}
const editTodo = ({ todo, value }) => {
  store.commit('todo/editTodo', { todo, value })
}
const toggleTodo = (todo) => {
  store.commit('todo/toggleTodo', todo)
}
const doneEdit = (e) => {
  const value = e.target.value.trim()
  const { todo } = props
  if (!value) {
    deleteTodo({
      todo
    })
  } else if (editing.value) {
    editTodo({
      todo,
      value
    })
    editing.value = false
  }
}
const cancelEdit = (e) => {
  e.target.value = props.todo.text
  editing.value = false
}

</script>
