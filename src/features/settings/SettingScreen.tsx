import { useMutation } from '@tanstack/react-query'
import { BaseButton } from 'components/button'
import { TextInput } from 'components/input'
import { Loading } from 'components/loading'
import { changeCurrentUser, logoutSuccess } from 'features/auth/sign-in/state'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { editUser } from './services'

const SettingScreen = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useAppDispatch()

  const { handleSubmit, register, setValue } = useForm()

  useEffect(() => {
    if (currentUser) {
      setValue('image', currentUser.image)
      setValue('username', currentUser.username)
      setValue('bio', currentUser.bio)
      setValue('email', currentUser.email)
    }
  }, [currentUser])

  const mutation = useMutation(editUser, {
    onSuccess: (data) => {
      console.log(data)
      dispatch(changeCurrentUser(data?.user))
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const onSubmit = (data: any) => {
    const editData = {
      user: { ...data }
    }
    console.log(editData)
    mutation.mutate(editData)
  }
  return (
    <div className="flex items-center justify-center">
      {mutation.isLoading && <Loading />}
      <div>
        <p className="pt-10 text-center text-4xl"> Your Settings</p>
        <form
          className="border-b-2 pb-4 pt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6">
            <TextInput className="w-[440px] py-[8px]" {...register('image')} />
            <TextInput
              className="w-[440px] py-[10px]"
              {...register('username')}
            />
            <textarea
              rows={8}
              className="w-[440px] rounded-md border-[1px] border-gray-400 px-[10px] py-[10px] outline-none focus:border-slate-700"
              {...register('bio')}
            />
            <TextInput className="w-[440px] py-[10px]" {...register('email')} />
            <TextInput
              placeholder="New Password"
              className="w-[440px] py-[10px]"
              {...register('password')}
            />
          </div>
          <div className="pt-8 text-right">
            <BaseButton
              type="submit"
              title="Update Settings"
              className="px-6 py-2"
            />
          </div>
        </form>
        <div className="pt-8 ">
          <BaseButton
            type="button"
            title="Or click here to logout."
            handleClick={() => dispatch(logoutSuccess())}
            className="border-[1px] border-red-500 bg-white px-6 py-2 text-red-500 hover:bg-red-500 hover:text-white"
          />
        </div>
      </div>
    </div>
  )
}

export default SettingScreen
