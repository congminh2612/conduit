import { IUser } from 'types/user'

export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList?: string[]
  favorited: boolean
  favoritesCount: number
  createdAt: string
  author: Partial<IUser>
}
