import axios from 'axios'
import { getToken, logout } from './auth'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const msg = error.response?.data?.detail || '请求失败'
    if (error.response?.status === 401) {
      logout()
      window.location.href = '/login'
    } else {
      ElMessage.error(msg)
    }
    return Promise.reject(error)
  }
)

export default request
