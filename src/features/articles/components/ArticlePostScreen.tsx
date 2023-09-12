import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BaseButton } from 'components/button'
import { TextInput } from 'components/input'
import { Loading } from 'components/loading'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { IArticle } from 'types/article'
import { ZodType, z } from 'zod'
import { postArticle } from '../services/postArticle'

const ArticlePostScreen = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const formArticle: ZodType<Partial<IArticle>> = z.object({
    body: z.string().nonempty({ message: 'Body is required' }),
    description: z.string().nonempty({ message: 'Description is required' }),
    title: z.string().nonempty({ message: 'Title is required' })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Partial<IArticle>>({
    resolver: zodResolver(formArticle)
  })
  const mutation = useMutation(postArticle, {
    onSuccess(data) {
      console.log(data)
      queryClient.invalidateQueries(['articles'])
      navigate('/')
    },
    onError(error) {
      toast.error("Can't post article")
    }
  })
  const onSubmit = (data: Partial<IArticle>) => {
    const articleData = {
      article: {
        ...data,
        tagList: []
      }
    }
    mutation.mutate(articleData)
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

export default ArticlePostScreen
