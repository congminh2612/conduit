import { axiosInstance } from 'services/axios.config'

const getArticles = async (
  limit: number,
  offset: number,
  tag?: string | null
) => {
  const res = await axiosInstance.get(
    `/articles?limit=${limit}&offset=${offset}${tag ? `&tag=${tag}` : ''}`
  )
  return res.data
}

export { getArticles }
