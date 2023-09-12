import { axiosInstance } from 'services/axios.config'

export const like = async (slug: string) => {
  const res = await axiosInstance.post(`/articles/${slug}/favorite`)
  return res.data
}
