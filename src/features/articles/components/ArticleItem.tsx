import { useMutation, useQueryClient } from '@tanstack/react-query'
import Icon from 'components/icons/Icon'
import { Loading } from 'components/loading'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IArticle } from 'types/article'
import formatDate from 'utils/formatDate'
import { deleteLike } from '../services/deleteLike'
import { like } from '../services/like'

interface ArticleItemProps {
  article: IArticle
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const {
    title,
    description,
    author,
    createdAt,
    tagList,
    favorited,
    favoritesCount,
    slug
  } = article

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutationLike = useMutation((slug: string) => like(slug), {
    onSuccess(data) {
      console.log(data)
      queryClient.invalidateQueries(['articles'])
    },
    onError(error) {
      console.log(error)
    }
  })
  const mutationDelLike = useMutation((slug: string) => deleteLike(slug), {
    onSuccess(data) {
      console.log(data)
      queryClient.invalidateQueries(['articles'])
    },
    onError(error) {
      console.log(error)
    }
  })
  return (
    <div
      aria-hidden="true"
      className="mt-3 min-w-[900px] border-b-2 py-4 hover:cursor-pointer"
    >
      {(mutationDelLike.isLoading || mutationLike.isLoading) && <Loading />}
      <div className="flex items-center justify-between pr-2">
        <div className="flex items-center space-x-2">
          <img src={author.image} alt="" className="w-[40px] rounded-full" />
          <div className="">
            <p className="text-base text-primary">{author.username}</p>
            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-1 ">
          {favorited ? (
            <Icon
              icon="heart"
              onClick={() => {
                mutationDelLike.mutate(slug)
              }}
              size="24"
              className="text-primary hover:text-gray-300"
            />
          ) : (
            <Icon
              icon="heart"
              onClick={() => mutationLike.mutate(slug)}
              size="24"
              className="text-gray-300 hover:text-primary"
            />
          )}

          <p className="text-sm font-normal text-gray-600">{favoritesCount}</p>
        </div>
      </div>
      <div className="pl-2 pt-2" onClick={() => navigate(`/article/${slug}`)}>
        <p className="text-xl font-medium">{title}</p>
        <p className="pt-[2px] text-sm font-light text-gray-500">
          {description}
        </p>
        <div className="flex items-center justify-between pt-4">
          <p className="pt-4 text-sm text-gray-500">read more...</p>
          <div className="flex space-x-1 pr-2">
            {tagList?.map((tag) => {
              return (
                <div key={tag}>
                  <span className="rounded-2xl border-[1px] px-2 py-[2px] text-sm font-light text-gray-500">
                    {tag}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleItem
