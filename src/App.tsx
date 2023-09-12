import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from 'components/layouts/Layout'
import { ProtectedRoute } from 'components/protected-route'
import { ArticleEditScreen } from 'features/articles/components'
import ArticleDetailScreen from 'features/articles/components/ArticleDetailScreen'
import ArticlePostScreen from 'features/articles/components/ArticlePostScreen'
import { SignInScreen } from 'features/auth/sign-in'
import { SignUpScreen } from 'features/auth/sign-up'
import HomeScreen from 'features/home/components/HomeScreen'
import SettingScreen from 'features/settings/SettingScreen'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'

function App() {
  const queryClient = new QueryClient()
  const isLogged = useAppSelector((state) => state.auth.isLogged)
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/article/:slug" element={<ArticleDetailScreen />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
        </Route>
        <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route element={<Layout />}>
            <Route path="/setting" element={<SettingScreen />} />
            <Route path="/editor" element={<ArticlePostScreen />} />
            <Route path="/editor/:slug" element={<ArticleEditScreen />} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
