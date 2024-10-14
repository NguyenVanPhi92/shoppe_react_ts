import { setBackdropVisible } from '@/store'
import type { AsyncHandler } from '@/types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toast'

interface Res {
  asyncHandler: <T>(params: AsyncHandler<T>) => void
  isLoading: boolean
}

const useAsync = (): Res => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      dispatch(setBackdropVisible(false))
    }
  }, [dispatch])

  const asyncHandler = async <T,>(params: AsyncHandler<T>) => {
    const { fetcher, onSuccess, onError, config } = params
    const method = config?.method || 'POST'
    const {
      errorMsg,
      successMsg,
      showBackdrop = method === 'POST',
      showErrorMsg = method === 'POST',
      showSuccessMsg = method === 'POST',
      shouldsetLoading,
    } = config || {}

    try {
      showBackdrop && setBackdropVisible(true)
      shouldsetLoading && setLoading(true)
      const res = await fetcher
      shouldsetLoading && setLoading(false)
      showBackdrop && setBackdropVisible(false)

      if (!res?.status) {
        onError?.(res)
        showErrorMsg && toast.error(errorMsg || res?.message || 'Có lỗi xảy ra')
        return
      }

      onSuccess?.((res as any)?.data || res)
      showSuccessMsg && toast.success(successMsg || res?.message || 'Có lỗi xảy ra')
    } catch (error) {
      showErrorMsg && toast.error(errorMsg || 'Có lỗi xảy ra')
      showBackdrop && setBackdropVisible(false)
      shouldsetLoading && setLoading(false)
      onError?.(undefined)
    }
  }

  return {
    asyncHandler,
    isLoading,
  }
}

export { useAsync }
