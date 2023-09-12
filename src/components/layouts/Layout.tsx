import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import Header from './header/Header'
import HeaderLogged from './header/HeaderLogged'

const Layout = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  return (
    <div>
      {currentUser ? <HeaderLogged /> : <Header />}
      <Outlet />
    </div>
  )
}

export default Layout
