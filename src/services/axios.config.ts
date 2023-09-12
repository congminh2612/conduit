import axios, { AxiosRequestConfig } from 'axios'
import { useAuth } from 'hooks/useToken'

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig | any) {
    let token = ''
    const currentUser = await useAuth()
    if (currentUser) token = currentUser.token
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error.response.data)
  }
)

export { axiosInstance }
