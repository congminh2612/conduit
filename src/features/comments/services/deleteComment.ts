import { axiosInstance } from 'services/axios.config'

const deleteComment = async (slug?: string, commentId?: number) => {
  const res = await axiosInstance.delete(
    `/articles/${slug}/comments/${commentId}`
  )
  return res.data
}
export { deleteComment }
