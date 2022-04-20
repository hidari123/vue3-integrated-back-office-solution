import axios from 'axios'

const service = axios.create({
  baseURL: 'https://api.imooc-admin.lgdsunday.club/api',
  timeout: 5000
})

export default service
