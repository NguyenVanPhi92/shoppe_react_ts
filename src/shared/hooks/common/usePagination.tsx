import { isArrayHasValue } from '../../helper/functions'

interface PaginationProps {
  limit: number
  list: Array<any>
  page: number
}

export interface PaginationRes {
  data: Array<any>
  totalPage: number
  page: number
  nextPage: number
  prevPage: number
}

export const usePagination = ({ page, limit, list }: PaginationProps): PaginationRes => {
  if (!isArrayHasValue(list))
    return {
      data: [],
      page: 1,
      totalPage: 1,
      nextPage: 0,
      prevPage: 0
    }

  const totalPage = list.length <= limit ? 1 : Math.ceil(list.length / limit)

  return {
    data: list.slice((page - 1) * limit, page * limit),
    totalPage,
    page,
    nextPage: page >= totalPage ? 0 : page + 1,
    prevPage: page - 1
  }
}

export default usePagination
