import { createSlice } from '@reduxjs/toolkit'
import { IArticle } from 'types/article'
interface tagState {
  currentTag: string | null
  articles: IArticle[] | null
}
const initialState: tagState = {
  currentTag: null,
  articles: []
}

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setCurrentTag(state, action) {
      state.currentTag = action.payload
    },
    setArticles(state, action) {
      state.articles = action.payload
    }
  }
})
export const { setCurrentTag, setArticles } = tagSlice.actions
export default tagSlice.reducer
