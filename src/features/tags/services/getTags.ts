import { axiosInstance } from 'services/axios.config'
import { ITag } from 'types/tag'

export const getTags = async () => {
  const res = await axiosInstance.get<ITag>('/tags')
  return res.data
}
