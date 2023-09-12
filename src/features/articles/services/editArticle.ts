import { axiosInstance } from 'services/axios.config'
import { IArticle } from 'types/article'

const editArticle = async (
  slug?: string | null,
  article?: { article: Partial<IArticle> }
) => {
  const res = await axiosInstance.put(`/articles/${slug}`, article)
  return res.data
}
export { editArticle }
