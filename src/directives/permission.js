/*
 * @Author: hidari
 * @Date: 2022-06-02 14:50:37
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-02 16:46:02
 * @FilePath: \vue3-integrated-back-office-solution\src\directives\permission.js
 * @Description: 权限自定义指令
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import store from '@/store'
/**
 * 检查是否具有权限
 */
const checkPermission = (el, binding) => {
  // 获取对应权限
  // value 获取传递过来的值
  const { value } = binding
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points
  // value 必须是一个数组
  if (value && value instanceof Array) {
    // 匹配对应的指令
    // some() 方法用于检测数组中的元素是否满足指定条件
    /**
     * some() 方法会依次执行数组的每个元素：
     * 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
     * 如果没有满足条件的元素，则返回false。
     * 注意： some() 不会对空数组进行检测。
     * 注意： some() 不会改变原始数组。
     */
    // JS中除了some()还有every()方法，与some()方法相反
    const hasPermission = points.some(points => {
      return value.includes(points)
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮(el元素)
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  // 在绑定元素的父组件被挂载后调用
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组建的 Vnode 及其子组件的 Vnode 更新后调用
  update (el, binding) {
    checkPermission(el, binding)
  }
}
