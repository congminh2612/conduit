import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BaseButton } from 'components/button'
import { TextInput } from 'components/input'
import { Loading } from 'components/loading'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { IArticle } from 'types/article'
import { ZodType, z } from 'zod'
import { editArticle, getArticleDetail } from '../services'

const ArticleEditScreen = () => {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const formArticle: ZodType<Partial<IArticle>> = z.object({
    body: z.string().nonempty({ message: 'Body is required' }),
    description: z.string().nonempty({ message: 'Description is required' }),
    title: z.string().nonempty({ message: 'Title is required' })
  })

  const { data } = useQuery<{ article: IArticle }>({
    queryKey: ['article', slug],
    queryFn: () => getArticleDetail(slug)
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<Partial<IArticle>>({
    resolver: zodResolver(formArticle)
  })

  useEffect(() => {
    if (data) {
      setValue('title', data.article.title)
      setValue('description', data.article.description)
      setValue('body', data.article.body)
      setValue('tagList', data.article.tagList)
    }
  }, [setValue, data])

  const mutation = useMutation(
    (article: { article: Partial<IArticle> }) => editArticle(slug, article),
    {
      onSuccess(data) {
        toast.success('Edit article success')
      },
      onError(error) {
        toast.error("Can't edit article")
      }
    }
  )
  const onSubmit = async (data: Partial<IArticle>) => {
    const articleData = {
      article: {
        ...data,
        tagList: []
      }
    }
    mutation.mutateAsync(articleData)
  }
  return (
    <div className="mx-[340px]">
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </div>
      {mutation.isLoading && <Loading />}
      <div className="flex items-center justify-center">
        <form className="pt-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div>
              <TextInput
                placeholder="Article title"
                className="w-[750px]"
                {...register('title')}
              />
              {errors.title && (
                <p className="pt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <TextInput
                placeholder="What's this article about"
                className="w-[750px]"
                {...register('description')}
              />
              {errors.description && (
                <p className="pt-2 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                rows={8}
                placeholder="Write you articles"
                className="w-[750px] border-2 px-2 py-2"
                {...register('body')}
              />
              {errors.body && (
                <p className="pt-2 text-sm text-red-500">
                  {errors.body.message}
                </p>
              )}
            </div>
            <TextInput
              placeholder="Enter tags"
              className="w-[750px]"
              {...register('tagList')}
            />
          </div>
          <div className="pt-8 text-right">
            <BaseButton title="Publish Article" className="px-6 py-2 " />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArticleEditScreen
