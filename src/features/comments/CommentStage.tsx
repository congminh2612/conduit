import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BaseButton } from 'components/button'
import { Loading } from 'components/loading'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { IComments } from 'types/comments'
import CommentItem from './CommentItem'
import { getComments } from './services/getComments'
import { postComment } from './services/postComment'
import { IFormComment } from './types'

const CommentStage = () => {
  const queryClient = useQueryClient()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const { slug } = useParams()

  const { data } = useQuery<{ comments: IComments[] }>({
    queryKey: ['comments', slug],
    queryFn: () => getComments(slug)
  })

  const mutationAdd = useMutation(
    (comment: { comment: IFormComment }) => postComment(slug, comment),
    {
      onSuccess(data) {
        console.log(data)
        reset()
        queryClient.invalidateQueries(['comments', slug])
      },
      onError(error) {
        console.log(error)
      }
    }
  )

  const { handleSubmit, register, reset } = useForm<IFormComment>()
  const onSubmit = (data: IFormComment) => {
    const commentData = {
      comment: {
        ...data
      }
    }
    console.log(commentData)
    mutationAdd.mutate(commentData)
  }

  return (
    <div className="w-[650px]">
      <div>
        {mutationAdd.isLoading && <Loading />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <textarea
              placeholder="Write a comment..."
              rows={3}
              className="w-[650px] border-2 border-gray-300 px-3 py-3 outline-none "
              {...register('body')}
            />
            <div className="flex items-center justify-between pt-2">
              {currentUser && (
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser.image}
                    alt=""
                    className="w-[30px] rounded-full"
                  />
                  <p className="text-sm text-gray-500">
                    {currentUser.username}
                  </p>
                </div>
              )}
              <BaseButton
                type="submit"
                title="Post Comments"
                className="px-4 py-[6px]"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="space-y-8 pt-12">
        {data &&
          data?.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CommentItem comment={comment} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CommentStage
