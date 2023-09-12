import { axiosInstance } from 'services/axios.config'
import { IFormSignUp } from '../types'

export const signUp = async (signUpData: { user: IFormSignUp }) => {
  const res = await axiosInstance.post('/users', signUpData)
  return res.data
}
