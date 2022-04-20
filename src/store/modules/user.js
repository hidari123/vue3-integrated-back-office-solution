import { login } from '@/api/sys'
import MD5 from 'md5'
export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    /**
     * 登录请求动作
     * @param context
     * @param userInfo
     * @returns {Promise<unknown>}
     */
    login (context, userInfo) {
      const { username, password } = userInfo
      // 无论是登录成功还是失败 希望在组件中对应处理
      return new Promise((resolve, reject) => {
        login({
          username,
          password: MD5(password)
        }).then(data => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
