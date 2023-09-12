import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="mx-[20px] flex items-center justify-between pt-4 md:mx-[150px] lg:mx-[300px] xl:mx-[340px]">
      <div className="cursor-pointer text-2xl font-semibold text-primary">
        <Link to="/">conduit</Link>
      </div>
      <div>
        <nav className="flex space-x-6 text-gray-400">
          <Link to={'/'} className="cursor-pointer hover:text-gray-900">
            Home
          </Link>
          <Link to={'/sign-in'} className="cursor-pointer hover:text-gray-900">
            Sign in
          </Link>
          <Link to={'/sign-up'} className="cursor-pointer hover:text-gray-900">
            Sign up
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
