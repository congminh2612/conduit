import { axiosInstance } from 'services/axios.config'
import { IUser } from 'types/user'

export const editUser = async (editData: { user: IUser }) => {
  const res = await axiosInstance.put('/user', editData)
  return res.data
}
