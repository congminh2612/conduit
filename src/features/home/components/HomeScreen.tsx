import TagStage from 'features/tags/TagStage'
import { setCurrentTag } from 'features/tags/state'
import { useAppDispatch } from 'store/hooks'
import GlobalFeed from './GlobalFeed'

const HomeScreen = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="mb-[60px]">
      <div className="mt-2 bg-primary py-8 text-center">
        <p className="text-5xl font-semibold text-white">conduit</p>
        <p className="pt-6 text-2xl font-light text-gray-200">
          Aplace to share your knowledge
        </p>
      </div>
      <div className="mx-[340px]">
        <div className="flex justify-between space-x-4">
          <div>
            {' '}
            <GlobalFeed />
          </div>
          <TagStage onChangeTag={(tag) => dispatch(setCurrentTag(tag))} />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
