/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-05-27 10:01:13
 * @FilePath: \vue3-integrated-back-office-solution\src\utils\request.js
 * @Description: 封装 request 请求
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 在这里统一注入 token
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // 退出操作
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 配置接口国际化
  config.headers['Accept-Language'] = store.getters.language
  // 必须返回配置
  return config
},
error => {
  return Promise.reject(error)
})

// 响应拦截器
// 两个值 成功 response 失败 err
service.interceptors.response.use(
  // 请求成功
  response => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败（请求成功，业务失败）消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  }, error => {
    // 请求失败
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(new Error(error.message))
  }
)

export default service
