import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BaseButton } from 'components/button'
import { TextInput } from 'components/input'
import Loading from 'components/loading/Loading'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ZodType, z } from 'zod'
import { signUp } from './services'
import { IFormSignUp } from './types'

const SignUpScreen = () => {
  const navigate = useNavigate()
  const formSignUp: ZodType<IFormSignUp> = z.object({
    username: z.string().nonempty({ message: 'Name is not empty' }),
    email: z
      .string()
      .nonempty({ message: 'Email is not empty' })
      .email({ message: 'Email is valid' }),
    password: z
      .string()
      .nonempty({ message: 'Password is not empty' })
      .min(6, 'Password must contain at least 6 characters')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormSignUp>({
    resolver: zodResolver(formSignUp)
  })

  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      console.log(data)
      navigate('/sign-in')
    },
    onError: (error: AxiosError | any) => {}
  })
  const onSubmit = (data: IFormSignUp) => {
    const dataSignUp = {
      user: { ...data }
    }
    mutation.mutate(dataSignUp)
  }
  return (
    <div className="flex items-center justify-center pt-10 ">
      {mutation.isLoading && <Loading />}
      <div className="">
        <p className="text-center text-4xl font-medium">Sign Up</p>
        <form className="pt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div>
              <TextInput
                placeholder="Name"
                className="w-[500px] px-4 py-[14px]"
                {...register('username')}
              />
              {errors.username && (
                <p className="ml-2 pt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
              {mutation.isError &&
                'username' in mutation.error?.response?.data?.errors && (
                  <p className="ml-2 pt-2 text-sm text-red-500">
                    {mutation.error.response.data.errors.username[0]}
                  </p>
                )}
            </div>
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
              {mutation.isError &&
                'email' in mutation.error?.response?.data?.errors && (
                  <p className="ml-2 pt-2 text-sm text-red-500">
                    {mutation.error.response.data.errors.email[0]}
                  </p>
                )}
            </div>
            <div>
              <TextInput
                placeholder="Password"
                className="w-[500px] px-4 py-[14px]"
                {...register('password')}
                type="password"
              />
              {errors.password && (
                <p className="ml-2 pt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="ml-[390px] pt-8">
            <BaseButton title="Sign up" className="px-8 py-3" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUpScreen
