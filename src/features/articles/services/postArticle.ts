import { axiosInstance } from 'services/axios.config'
import { IArticle } from 'types/article'

export const postArticle = async (articleData: {
  article: Partial<IArticle>
}) => {
  const res = await axiosInstance.post('/articles', articleData)
  return res.data
}
