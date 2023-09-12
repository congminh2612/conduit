import { IUser } from 'types/user'

export interface IComments {
  id: number
  createdAt: string
  body: string
  author: Partial<IUser>
}
