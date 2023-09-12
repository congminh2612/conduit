import { store } from 'store/store'

const useAuth = () => {
  const currentUser = store.getState().auth.currentUser
  return currentUser
}

export { useAuth }
