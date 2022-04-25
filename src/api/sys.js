import request from '@/utils/request'

/**
 * 登录
 * return promise
 */
export const login = data => request({
  url: '/sys/login',
  method: 'POST',
  data
})

/**
 * 获取用户信息
 */
export const getUserInfo = () => request({
  url: '/sys/profile'
})
