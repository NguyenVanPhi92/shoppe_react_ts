import { useState } from 'react'
import useSWR from 'swr'

import type {
  HTTPResponse,
  QueryList,
  QueryListFetchMoreFunction,
  QueryListFunction,
  UseQueryListRes
} from '@/types'
import { PublicConfiguration } from 'swr/_internal'

const DEFAULT_LIMIT = 12

// KDL khi khởi tạo custom hook này: sẽ có 2 types cần truyền vào: T là KDL của data, V là KDL của params
export interface UseQueryListProps<T, V extends QueryList> {
  fetcher: (params?: any) => Promise<HTTPResponse<T[]>>
  key: string | null
  initialData?: T[] | undefined
  initialParams?: V
  config?: Partial<PublicConfiguration<any, any, (args_0: string) => any>>
}

export const useQueryList = <T, V extends QueryList>({
  fetcher,
  key,
  initialData,
  initialParams,
  config,
}: UseQueryListProps<T, V>): UseQueryListRes<T, V> => {
  const limit = initialParams?.limit || DEFAULT_LIMIT

  const { isValidating, mutate, data, error } = useSWR(
    key,
    fetcher
      ? () =>
          fetcher(initialParams)
            .then((res) => {
              const data = getDataResponse(res)
              setHasMore(data.length >= limit)
              return data
            })
            .catch((err) => console.log(err))
      : null,
    {
      ...config,
      fallbackData: initialData,
    }
  )

  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [params, setParams] = useState<(V & QueryList) | undefined>(initialParams)

  const getDataResponse = <T,>(res: HTTPResponse<T[]>): T[] => {
    return res?.data || []
  }

  const refresh = () => {
    mutate()
    setOffset(0)
    setHasMore(true)
    setLoading(false)
    setFetchingMore(false)
    setParams(initialParams)
  }

  const filter = async (_: QueryListFunction<T, V>) => {
    const { params: _params, onError, onSuccess } = _

    try {
      setLoading(true)
      const newParams = { ...params, ..._params, limit, offset: 0 }

      const res = await fetcher(newParams)
      const data = getDataResponse<T>(res)

      setParams(newParams)
      setLoading(false)
      setOffset(0)
      setHasMore(data.length >= limit)

      mutate(data, false)
      onSuccess?.(data)
    } catch (error) {
      setLoading(false)
      onError?.()
      console.log(error)
    }
  }

  const fetchMore = async (_?: QueryListFetchMoreFunction<T>) => {
    if (data?.length < limit || !hasMore || isFetchingMore || isValidating || isLoading) return

    try {
      setFetchingMore(true)
      const newOffset = offset + limit
      const newParams = { ...params, limit, offset: newOffset } as V & QueryList

      const res = await fetcher(newParams)
      const list = getDataResponse<T>(res)

      setFetchingMore(false)
      setParams(newParams)
      setOffset(offset + limit)
      setHasMore(list.length >= limit)

      mutate([...(data || []), ...list], false)
      _?.onSuccess?.(list)
    } catch (error) {
      _?.onError?.()
      setFetchingMore(false)
      console.log(error)
    }
  }

  return {
    data,
    isValidating: isValidating || isLoading,
    isFirstLoading: data === undefined && error === undefined,
    isFetchingMore,
    hasMore: hasMore && data?.length >= limit,
    offset,
    error,
    params,
    fetchMore,
    filter,
    mutate,
    refresh,
  }
}
