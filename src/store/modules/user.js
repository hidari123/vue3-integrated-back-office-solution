import { login } from '@/api/sys'
import MD5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    // 要完成自动登录 所以这里不能放空字符串
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
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
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
