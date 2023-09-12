import Icon from 'components/icons/Icon'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'

const HeaderLogged = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  console.log(currentUser)

  return (
    <div className="mx-[20px] flex items-center justify-between pt-6 md:mx-[150px] lg:mx-[300px] xl:mx-[340px]">
      <div className="cursor-pointer text-2xl font-semibold text-primary">
        <Link to="/">conduit</Link>
      </div>
      <div>
        <nav className="flex items-center space-x-6 text-gray-400">
          <Link to={'/'} className="cursor-pointer hover:text-gray-900">
            Home
          </Link>
          <Link to={'/editor'} className="cursor-pointer hover:text-gray-900">
            <div className="flex items-center space-x-1">
              <Icon icon="post" size="20" />
              <p>New post</p>
            </div>
          </Link>
          <Link to={'/setting'} className="cursor-pointer hover:text-gray-900">
            <div className="flex items-center space-x-1">
              <Icon icon="setting" size="20" />
              <p>Setting</p>
            </div>
          </Link>
          <Link to={'/'} className="cursor-pointer hover:text-gray-900">
            {currentUser && (
              <div className="flex items-center space-x-1">
                <img
                  src={currentUser.image}
                  alt=""
                  width={25}
                  className=" rounded-full"
                />
                <p>{currentUser.username}</p>
              </div>
            )}
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default HeaderLogged
