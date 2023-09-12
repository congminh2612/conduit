import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BaseButton } from 'components/button'
import { Loading } from 'components/loading'
import CommentStage from 'features/comments/CommentStage'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { IArticle } from 'types/article'
import formatDate from 'utils/formatDate'
import { deleteArticle } from '../services/deleteArticle'
import { getArticleDetail } from '../services/getArticleDetail'

const ArticleDetailScreen = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const { slug } = useParams()
  console.log(slug)

  const { data, isLoading } = useQuery<{ article: IArticle }>({
    queryKey: ['article', slug],
    queryFn: () => getArticleDetail(slug)
  })
  const mutation = useMutation(() => deleteArticle(slug), {
    onSuccess(data) {
      queryClient.invalidateQueries(['articles'])
      navigate('/')
    },
    onError(error) {
      console.log(error)
    }
  })
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    )
  return (
    <div className="">
      {mutation.isLoading && <Loading />}
      {data && (
        <>
          <div className="mt-10 bg-gray-800 px-[340px] py-8">
            <p className="text-4xl text-white">{data.article.title}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 pt-6">
                <img
                  src={data?.article.author.image}
                  alt=""
                  className="w-[35px] rounded-full"
                />
                <div className="">
                  <p className="text-white">{data?.article.author.username}</p>
                  <p className="text-sm font-light text-gray-300">
                    {formatDate(data?.article.createdAt)}
                  </p>
                </div>
              </div>
              {currentUser?.username === data.article.author.username && (
                <div className="mt-7 flex space-x-4">
                  <BaseButton
                    icon="edit"
                    title="Edit Article"
                    className="hove:text-gray-500 border-[1px] border-gray-300 bg-gray-800 px-8 py-[6px] pl-2 text-sm text-gray-300 hover:bg-gray-500"
                    iconClass="w-[18px] h-[18px] pl-1 text-gray-200"
                    spacing="pl-[30px]"
                    handleClick={() => navigate(`/editor/${slug}`)}
                  />
                  <BaseButton
                    icon="delete"
                    title="Delete Article"
                    className="hove:text-white border-[1px] border-red-500 bg-gray-800 px-8 py-[6px] pl-2 text-sm text-gray-300 hover:bg-red-500"
                    iconClass="w-[18px] h-[18px] pl-1 text-red-600 hover:text-white"
                    spacing="pl-[30px]"
                    handleClick={() => mutation.mutateAsync()}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mx-[340px] border-b-[1px] py-[40px]">
            <p>{data?.article.description}</p>
          </div>
        </>
      )}
      {currentUser ? (
        <div className="flex  items-center justify-center py-10">
          <CommentStage />
        </div>
      ) : (
        <div className="mx-[340px] pt-[70px]">
          <p>
            <span
              onClick={() => navigate('/sign-in')}
              className="text-primary hover:cursor-pointer hover:underline"
            >
              Sign in
            </span>{' '}
            or{' '}
            <span
              onClick={() => navigate('/sign-in')}
              className="text-primary hover:cursor-pointer hover:underline"
            >
              sign up
            </span>{' '}
            to add comments on this article.
          </p>
        </div>
      )}
    </div>
  )
}

export default ArticleDetailScreen
