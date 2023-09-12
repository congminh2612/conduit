import { useQuery } from '@tanstack/react-query'
import { Loading } from 'components/loading'
import { useAppSelector } from 'store/hooks'
import { IArticle } from 'types/article'
import { getArticles } from '../services'
import ArticleItem from './ArticleItem'

interface ArticleListProps {
  page: number
  tag: string
}

const ArticleList: React.FC<ArticleListProps> = ({ page }) => {
  const currentTag = useAppSelector((state) => state.tag.currentTag)
  console.log(currentTag)
  const limit = 10
  const offset = page * limit - limit
  const { data, isLoading } = useQuery<{
    articles: IArticle[]
    articlesCount: number
  }>({
    queryKey: ['articles', limit, offset, currentTag],
    queryFn: () => getArticles(limit, offset, currentTag)
  })
  console.log(data)

  return (
    <div className="mt-4 space-y-8">
      {isLoading && <Loading />}
      {data &&
        data.articles.map((article) => {
          return (
            <div key={article.slug}>
              <ArticleItem article={article} />
            </div>
          )
        })}
    </div>
  )
}

export default ArticleList
