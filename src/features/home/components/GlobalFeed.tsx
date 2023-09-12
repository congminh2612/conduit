import { useQuery } from '@tanstack/react-query'
import ArticleList from 'features/articles/components/ArticleList'
import { getArticles } from 'features/articles/services'
import { useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { IArticle } from 'types/article'
import Pagination from './Pagination'

interface GlobalFeedProps {}

const GlobalFeed: React.FC<GlobalFeedProps> = () => {
  const currentTag = useAppSelector((state) => state.tag.currentTag)
  const [page, setPage] = useState<number>(1)
  let limit = 10
  let offset = 0
  const handleChangePage = (page: number) => {
    setPage(page)
  }
  const { data } = useQuery<{
    articles: IArticle[]
    articlesCount: number
  }>({
    queryKey: ['articles', limit, offset, currentTag],
    queryFn: () => getArticles(limit, offset, currentTag)
  })

  return (
    <div>
      <div>
        <ArticleList page={page} tag={''} />
      </div>
      {data && (
        <Pagination
          totalPages={Math.ceil(data.articlesCount / 10)}
          currentPage={page}
          onChangePage={handleChangePage}
        />
      )}
    </div>
  )
}

export default GlobalFeed
