import { axiosInstance } from 'services/axios.config'

export const deleteArticle = async (slug?: string) => {
  const res = await axiosInstance.delete(`/articles/${slug}`)
  return res.data
}
