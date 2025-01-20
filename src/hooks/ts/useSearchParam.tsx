import { useSearchParams } from 'react-router-dom'

// Create Hook Search lấy từ params url
export const useQueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject // trả về 1 object params vd: url?page=2
}
