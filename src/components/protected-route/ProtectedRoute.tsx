import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedProps {
  isLogged: boolean
  children?: React.ReactNode
}
const ProtectedRoute = ({ isLogged }: ProtectedProps) => {
  if (!isLogged) {
    return <Navigate to="/sign-in" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
