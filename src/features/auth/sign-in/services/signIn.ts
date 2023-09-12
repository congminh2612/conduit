import { axiosInstance } from 'services/axios.config'
import { IFormSignIn } from '../types'

export const signIn = async (signInData: { user: IFormSignIn }) => {
  const res = await axiosInstance.post('/users/login', signInData)
  return res.data
}
