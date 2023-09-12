import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BaseButton } from 'components/button'
import { TextInput } from 'components/input'
import { Loading } from 'components/loading'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { ZodType, z } from 'zod'
import { signIn } from './services'
import { loginSuccess } from './state'
import { IFormSignIn } from './types'

const SignInScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formSignIn: ZodType<IFormSignIn> = z.object({
    email: z
      .string()
      .nonempty({ message: 'Email is not empty' })
      .email({ message: 'Email is valid' }),
    password: z.string().nonempty({ message: 'Password is not empty' })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormSignIn>({
    resolver: zodResolver(formSignIn)
  })

  const mutation = useMutation(signIn, {
    onSuccess: (data) => {
      console.log(data?.user)
      dispatch(loginSuccess(data?.user))
      navigate('/')
    },
    onError: (error: AxiosError | any) => {
      toast.error('email or password is invalid')
    }
  })

  const onSubmit = async (data: IFormSignIn) => {
    const signInData = {
      user: { ...data }
    }
    console.log(signInData)
    mutation.mutate(signInData)
  }

  return (
    <div className="flex items-center justify-center pt-10">
      {mutation.isLoading && <Loading />}
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </div>

      <div className="pt-6">
        <p className="text-center text-4xl font-medium">Sign In</p>
        <form className="pt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div>
              <TextInput
                placeholder="Email"
                className="w-[500px] px-4 py-[14px]"
                {...register('email')}
              />
              {errors.email && (
                <p className="ml-2 pt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <TextInput
                placeholder="Password"
                className="w-[500px] px-4 py-[14px]"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <p className="ml-2 pt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="ml-[390px] pt-8">
            <BaseButton type="submit" title="Sign in" className="px-8 py-3" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInScreen
