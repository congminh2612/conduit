import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from 'types/user'

interface authState {
  currentUser: IUser | null
  isLogged: boolean
}

const initialState: authState = {
  currentUser: null,
  isLogged: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
      state.isLogged = true
    },
    changeCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
    },
    logoutSuccess: (state) => {
      state.currentUser = null
      state.isLogged = false
    }
  }
})

export const { loginSuccess, changeCurrentUser, logoutSuccess } =
  authSlice.actions
export const selectCurrentUser = (state: { auth: authState }) =>
  state.auth.currentUser

export default authSlice.reducer
