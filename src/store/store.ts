import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/sign-in/state/authSlice'
import tagReducer from 'features/tags/state/tagSlice'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

type RootStatePersist = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootStatePersist> = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['tag']
}
const rootReducer = combineReducers({ auth: authReducer, tag: tagReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(thunk)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
