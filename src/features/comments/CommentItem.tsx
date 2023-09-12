import { useMutation, useQueryClient } from '@tanstack/react-query'
import Icon from 'components/icons/Icon'
import { Loading } from 'components/loading'
import React from 'react'
import { useParams } from 'react-router-dom'
import { IComments } from 'types/comments'
import formatDate from 'utils/formatDate'
import { deleteComment } from './services'

interface CommentItemProps {
  comment: IComments
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const queryClient = useQueryClient()
  const { body, author, createdAt } = comment
  const { slug } = useParams()
  const mutation = useMutation(() => deleteComment(slug, comment.id), {
    onSuccess(data) {
      console.log(data)
      queryClient.invalidateQueries(['comments', slug])
    },
    onError(error) {
      console.log(error)
    }
  })
  return (
    <div className="rounded-lg border-[1px] border-slate-600">
      {mutation.isLoading && <Loading />}
      <p className="border-b-[1px] border-slate-600 py-7 pl-3">{body}</p>
      <div className="flex items-center justify-between bg-gray-300 px-3 py-[6px]">
        <div className="flex items-center space-x-2">
          <img src={author.image} alt="" className="w-[28px] rounded-full" />
          <div>
            <p className="text-sm font-normal text-primary">
              {author.username}
            </p>
            <p className="text-xs font-light text-gray-500">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
        <Icon
          icon={'delete'}
          className="cursor-pointer hover:text-gray-600"
          onClick={() => mutation.mutate()}
        />
      </div>
    </div>
  )
}

export default CommentItem
