/*
 * @Author: hidari
 * @Date: 2022-05-24 09:08:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-01 09:27:42
 * @FilePath: \vue3-integrated-back-office-solution\src\store\modules\user.js
 * @Description: user 相关仓库
 *
 * Copyright (c) 2022 by 1640106564@qq.com, All Rights Reserved.
 */

import { getUserInfo, login } from '@/api/sys'
import MD5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    // 要完成自动登录 所以这里不能放空字符串
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     * @param context
     * @param userInfo
     * @returns {Promise<unknown>}
     */
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      // 无论是登录成功还是失败 希望在组件中对应处理
      return new Promise((resolve, reject) => {
        login({
          username,
          // 密码防止传输时候破解用 md5 加密
          password: MD5(password)
        }).then(data => {
          // 触发 mutation 模块存储 token
          commit('setToken', data.token)
          // 跳转
          router.push('/')
          // 保存登录时间
          setTimeStamp()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 获取用户信息
     * @param context
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getUserInfo (context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录
     */
    logout () {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO: 清理权限相关配置
      router.push('/login')
    }
  }
}
