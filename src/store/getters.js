import variables from '@/styles/variables.scss'
// 快捷访问

const getters = {
  /**
   * 取出 token
   * @param state
   * @returns {*}
   */
  token: state => state.user.token,

  /**
   * 判断用户信息是否存在
   * @param state
   * @returns true => 用户信息已存在
   */
  hasUserInfo: state => {
    // 因为userInfo是对象格式 不能直接取出判断 现转化为字符串 再判断
    return JSON.stringify(state.user.userInfo) !== '{}'
  },

  /**
   * 用户信息
   * @param state
   * @returns {{}}
   */
  userInfo: state => state.user.userInfo,

  /**
   * variables 主题样式变量
   * @param state
   * @returns {*}
   */
  cssVar: state => variables
}

export default getters
