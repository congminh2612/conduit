import { axiosInstance } from 'services/axios.config'
import { IFormComment } from '../types'

export const postComment = async (
  slug: string | undefined,
  comment: { comment: IFormComment }
) => {
  const response = await axiosInstance.post(
    `/articles/${slug}/comments`,
    comment
  )
  return response.data
}
