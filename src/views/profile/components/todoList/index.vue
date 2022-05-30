<!--
 * @Author: hidari
 * @Date: 2022-05-30 11:51:57
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-30 14:45:34
 * @FilePath: \vue3-integrated-back-office-solution\src\views\profile\components\todoList\index.vue
 * @Description: todoList 组件
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
-->
<template>
    <section class="todoapp">
        <!-- header -->
        <header class="header">
            <!-- autocomplete属性是表单字段中的HTML5新属性，该属性有两种状态值，分别为"on" 和 “off”，该属性可省略：省略属性值后默认值为"on"，也可以省略属性名，直接写入关键字on或off。 因为浏览器内部也会默认开启一个输入字段后自动补全的功能，所以在有些情况下我们设置 autocomplete=“off” 后会失效。
            对此，MDN中给出了一个非常棒的tip，重点翻译于这一段： 尽管将autocomplet值设为off，在某些情况下仍会失效。
            所以处理这种情况的一个小tip就是将该属性赋一个除on 或 off之外的一个任意的值（你自己可以随便胡诌八扯一个值）。例如: autocomplete=“new-pwd”。 -->
            <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="$store.commit('todo/addTodo', $event)">
        </header>
        <!-- main section -->
        <section v-show="todos.length" class="main">
            <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="$store.commit('todo/toggleAll',{ done: !allChecked })">
            <label for="toggle-all" />
                  <ul class="todo-list">
                    <todo
                    v-for="(todo, index) in filteredTodos"
                    :key="index"
                    :todo="todo"
                    />
                </ul>
        </section>
        <!-- footer -->
        <footer v-show="todos.length" class="footer">
        <span class="todo-count">
            <strong>{{ remaining }}</strong>
            {{ pluralize(remaining,'item') }} left
        </span>
        <ul class="filters">
            <li v-for="(val, key) in filters" :key="key">
            <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ capitalize(key) }}</a>
            </li>
        </ul>
        <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="$store.commit('todo/clearCompleted')">
            Clear completed
        </button> -->
        </footer>
    </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Todo from './todo.vue'

// 筛选数据
const filters = reactive({
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
})
// 显示类型 默认为 all
const visibility = ref('all')
// 需要展示的 todos 数据
const store = useStore()
const todos = ref(store.getters.todos)

// 全选
const allChecked = computed(() => {
  return todos.value.every(todo => todo.done)
})

// 筛选
const filteredTodos = computed(() => {
  return filters[visibility.value](todos.value)
})

// 剩余
const remaining = computed(() => {
  return todos.value.filter(todo => !todo.done).length
})

/**
 * 定义根据长度判断是否展示 s
 * @param length 长度
 * @param name 需要改变的名字
 */
const pluralize = (length, name) => length === 1 ? name : name + 's'

/**
 * 首字母大写
 * @param key 希望首字母大写的名称
 */
const capitalize = (key) => key.charAt(0).toUpperCase() + key.slice(1)

</script>

<style lang="scss">
  @import './index.scss';
</style>
