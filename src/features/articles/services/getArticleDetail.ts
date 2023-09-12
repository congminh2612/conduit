import { axiosInstance } from 'services/axios.config'

const getArticleDetail = async (slug: string | undefined) => {
  const res = await axiosInstance.get(`/articles/${slug}`)
  return res.data
}
export { getArticleDetail }
