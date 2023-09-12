import { axiosInstance } from 'services/axios.config'

export const deleteLike = async (slug: string) => {
  const res = await axiosInstance.delete(`/articles/${slug}/favorite`)
  return res.data
}
