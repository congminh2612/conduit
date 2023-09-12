import { axiosInstance } from 'services/axios.config'

export const getComments = async (slug: string | undefined) => {
  const response = await axiosInstance.get(`/articles/${slug}/comments`)
  return response.data
}
